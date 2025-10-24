// --- Sub-Schemas ---

import { Model, model, models, Schema } from "mongoose";

// Schema for images used in the product page media gallery
const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

// Schema for pricing information
const PricingSchema = new Schema(
  {
    current_price: { type: Number, required: true, min: 0 },
    original_price: { type: Number, min: 0 },
    currency: { type: String, required: true, default: "INR" },
    discount: { type: Number, default: 0, min: 0 },
    discount_percent: { type: Number, default: 0, min: 0, max: 100 },
    is_on_sale: { type: Boolean, default: false },
  },
  { _id: false }
);

// Schema for individual customer reviews
const ReviewSchema = new Schema(
  {
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
    title: { type: String },
    comment: { type: String, required: true },
  },
  { _id: false }
);

// Schema for specific variant options (e.g., 'Queen' or 'Teal Velvet')
const VariantOptionSchema = new Schema(
  {
    value: { type: String, required: true },
    sku: { type: String }, // Full SKU for this variant option
    sku_suffix: { type: String }, // Used to construct the full SKU
    price_adjust: { type: Number, default: 0 }, // Price difference from the base price
    hex_code: { type: String }, // For color variants
  },
  { _id: false }
);

// Schema for a variant group (e.g., 'Size' or 'Color')
const VariantSchema = new Schema(
  {
    type: { type: String, required: true }, // e.g., "Size", "Color"
    options: [VariantOptionSchema],
  },
  { _id: false }
);

// --- Main Product Schema ---

const ProductSchema = new Schema(
  {
    // Core Identification
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },

    // Categorization
    category: { type: String, required: true },
    subcategory: { type: String },

    // Pricing & Stock
    pricing: { type: PricingSchema, required: true },

    stock: {
      available_quantity: { type: Number, default: 0, min: 0 },
      estimated_delivery: { type: String },
    },

    // Description
    description: {
      tagline: { type: String },
      long_description: { type: String, required: true },
      features: [{ type: String }], // Array of strings for bullet points
    },

    // Media
    media: {
      main_image: { type: String, required: true }, // URL or path
      images: [ImageSchema],
      video_url: { type: String, required: false },
    },

    // Specifications
    specifications: {
      size: { type: String },
      materials: {
        frame: { type: String },
        support: { type: String },
      },
      dimensions_cm: {
        overall: { type: String },
        headboard_height: { type: String },
        footboard_height: { type: String },
        clearance_under_bed: { type: String },
      },
      weight_capacity_kg: { type: Number },
      assembly_required: { type: Boolean, default: true },
      warranty: { type: String },
    },

    // Variants
    variants: [VariantSchema],

    // Reviews
    reviews: {
      average_rating: { type: Number, min: 0, max: 5, default: 0 },
      rating_count: { type: Number, min: 0, default: 0 },
      review_list: [ReviewSchema],
    },

    // Shipping & Returns
    shipping_returns: {
      shipping_policy: { type: String },
      return_policy: { type: String },
      assembly_service: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const Product =
  (models.Product as Model<IProduct>) ||
  model<IProduct>("Product", ProductSchema);
export default Product;

export interface IProduct {
  _id: string;
  sku: string;
  name: string;
  category: string;
  subcategory?: string;
  pricing: {
    current_price: number;
    original_price?: number;
    currency: string;
    discount?: number;
    discount_percent?: number;
    is_on_sale: boolean;
  };
  stock: {
    available_quantity: number;
    estimated_delivery?: string;
  };
  description: {
    tagline?: string;
    long_description: string;
    features: string[];
  };
  media: {
    main_image: string;
    images: { url: string; alt?: string }[];
    video_url?: string;
  };
  specifications: {
    size?: string;
    materials: {
      frame?: string;
      support?: string;
    };
    dimensions_cm: {
      overall?: string;
      headboard_height?: string;
      footboard_height?: string;
      clearance_under_bed?: string;
    };
    weight_capacity_kg?: number;
    assembly_required: boolean;
    warranty?: string;
  };
  variants: {
    type: string;
    options: {
      value: string;
      sku?: string;
      sku_suffix?: string;
      price_adjust?: number;
      hex_code?: string;
    }[];
  }[];
  reviews: {
    average_rating: number;
    rating_count: number;
    review_list: {
      user: string;
      rating: number;
      date: Date;
      title?: string;
      comment: string;
    }[];
  };
  shipping_returns: {
    shipping_policy?: string;
    return_policy?: string;
    assembly_service: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}
