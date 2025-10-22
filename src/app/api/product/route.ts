import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { "description.long_description": { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select("-__v")
      .lean();

    const total = await Product.countDocuments(filter); 
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        data: {
          products,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "sku",
      "name",
      "category",
      "pricing",
      "description",
      "media",
      "specifications",
      "stock",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate pricing structure
    if (!body.pricing.current_price || body.pricing.current_price < 0) {
      return NextResponse.json(
        { error: "Valid current price is required" },
        { status: 400 }
      );
    }

    // Validate Stock Structure
    if (!body.stock.available_quantity || typeof body.stock.available_quantity !== "number" || body.stock.available_quantity < 0) {
      return NextResponse.json(
        { error: "Valid stock quantity is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: body.sku });
    if (existingProduct) {
      return NextResponse.json(
        { error: "Product with this SKU already exists" },
        { status: 400 }
      );
    }

    const product = await Product.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
