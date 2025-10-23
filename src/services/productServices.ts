export const fetchProducts = async ({
  currentPage,
  searchQuery,
  selectedCategory,
  selectedSubcategory,
  sortBy,
  sortOrder,
}) => {
  try {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: "12",
      ...(searchQuery && { search: searchQuery }),
      ...(selectedCategory && { category: selectedCategory }),
      ...(selectedSubcategory && { subcategory: selectedSubcategory }),
      sortBy,
      sortOrder,
    });

    const response = await fetch(`/api/product?${params}`);
    const data = await response.json();
    console.log("fetchProducts response: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

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