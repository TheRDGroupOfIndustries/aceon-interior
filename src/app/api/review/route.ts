import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import dbConnect from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const {
      productId,
      user,
      rating,
      title,
      comment,
    }: {
      productId: string;
      user: string;
      rating: number;
      title: string;
      comment: string;
    } = await req.json();

    if (!productId || !user || !rating || !comment) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Add the new review
    product.reviews.review_list.push({
      user,
      rating,
      title,
      comment,
      date: undefined,
    });

    // Recalculate average rating and rating count
    const totalRatings = product.reviews.review_list.reduce(
      (sum: number, review: any) => sum + review.rating,
      0
    );
    product.reviews.rating_count = product.reviews.review_list.length;
    product.reviews.average_rating =
      product.reviews.rating_count > 0
        ? totalRatings / product.reviews.rating_count
        : 0;

    await product.save();

    return NextResponse.json(
      { message: "Review added successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
