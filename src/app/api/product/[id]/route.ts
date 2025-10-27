import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/upload";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();

    const product = await Product.findById(id).select("-__v");

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    await dbConnect();

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Extract fields from JSON data
    const {
      name,
      category,
      subcategory,
      pricing,
      description,
      specifications,
      stock,
      variants = [],
      shipping_returns = {},
      media,
    } = data;

    // Validate required fields
    if (
      !name ||
      !category ||
      !pricing ||
      !description ||
      !specifications ||
      !stock ||
      !media
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate pricing structure
    if (!pricing.current_price || pricing.current_price < 0) {
      return NextResponse.json(
        { error: "Valid current price is required" },
        { status: 400 }
      );
    }

    // Validate Stock Structure
    if (
      !stock.available_quantity ||
      typeof stock.available_quantity !== "number" ||
      stock.available_quantity < 0
    ) {
      return NextResponse.json(
        { error: "Valid stock quantity is required" },
        { status: 400 }
      );
    }

    // Prepare updated product data
    const updatedProductData = {
      name,
      category,
      subcategory: subcategory || undefined,
      pricing,
      description,
      specifications,
      stock,
      variants,
      shipping_returns,
      media,
      updatedAt: new Date(),
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductData,
      { new: true, runValidators: true }
    ).select("-__v");

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating product:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete associated images from Cloudinary
    try {
      // Delete main image
      if (deletedProduct.media.main_image) {
        const publicId = deletedProduct.media.main_image
          .split("/")
          .pop()
          ?.split(".")[0];
        if (publicId) {
          await deleteFromCloudinary(`products/${publicId}`);
        }
      }

      // Delete gallery images
      for (const image of deletedProduct.media.images || []) {
        const publicId = image.url.split("/").pop()?.split(".")[0];
        if (publicId) {
          await deleteFromCloudinary(`products/gallery/${publicId}`);
        }
      }
    } catch (deleteError) {
      console.error("Error deleting images from Cloudinary:", deleteError);
      // Don't fail the deletion if image cleanup fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
