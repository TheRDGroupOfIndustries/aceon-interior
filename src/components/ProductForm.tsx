import React, { useState, useMemo } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  UseFormRegister,
  FieldErrors,
  FieldError,
  Control,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

// Inline Icons (replacing react-icons imports for guaranteed compilation)
const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 5.25a.75.75 0 0 1 .75.75v5.25H18a.75.75 0 0 1 0 1.5h-5.25V18a.75.75 0 0 1-1.5 0v-5.25H6a.75.75 0 0 1 0-1.5h5.25V6a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);
const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.03l5.495-2.617 4.35 2.175a.75.75 0 0 0 .97-1.13L12 12.75l-4.708-2.354a.75.75 0 0 0-.74.004L3 12.486v3.545ZM15.75 9A.75.75 0 0 1 16.5 9.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Constants & Helper Functions ---

const DEFAULT_VARIANT_OPTION = {
  value: "",
  sku: "",
  sku_suffix: "",
  price_adjust: 0,
  hex_code: "",
};

const DEFAULT_VARIANT_GROUP = {
  type: "",
  options: [{ ...DEFAULT_VARIANT_OPTION }],
};

const getDefaultValues = (product?: any) => {
  if (!product) {
    // Default values for a new product
    return {
      sku: "",
      name: "",
      category: "",
      subcategory: "",
      pricing: {
        current_price: 0,
        original_price: 0,
        currency: "INR",
        discount: 0,
        discount_percent: 0,
        is_on_sale: false,
      },
      stock: {
        available_quantity: 0,
        estimated_delivery: "5-7 business days",
      },
      description: {
        tagline: "",
        long_description: "",
        features: ["", ""], // Start with two empty features
      },
      media: {
        main_image: "",
        images: [], // Gallery images
      },
      specifications: {
        size: "",
        materials: { frame: "", support: "" },
        dimensions_cm: {
          overall: "",
          headboard_height: "",
          footboard_height: "",
          clearance_under_bed: "",
        },
        weight_capacity_kg: 0,
        assembly_required: true,
        warranty: "",
      },
      variants: [], // No variants by default
      reviews: {
        average_rating: 0,
        rating_count: 0,
      },
      shipping_returns: {
        shipping_policy: "",
        return_policy: "",
        assembly_service: false,
      },
    };
  }

  // Use existing product data, ensuring arrays and nested objects exist
  return {
    ...product,
    pricing: product.pricing || getDefaultValues().pricing,
    stock: product.stock || getDefaultValues().stock,
    description: {
      ...product.description,
      features: product.description.features || ["", ""],
    },
    media: product.media || getDefaultValues().media,
    specifications: product.specifications || getDefaultValues().specifications,
    variants: product.variants || [],
    shipping_returns:
      product.shipping_returns || getDefaultValues().shipping_returns,
  };
};

const formatPrice = (price) => {
  return price !== null && price !== undefined
    ? `₹${price.toLocaleString("en-IN")}`
    : "₹0";
};

// --- Custom Components ---

const InputField = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder = "",
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber: type === "number" })}
      className={`block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm transition duration-150 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-amber-500 focus:ring-amber-500"
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

const TextAreaField = ({
  label,
  name,
  register,
  error,
  rows = 3,
  placeholder = "",
}: {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  rows?: number;
  placeholder?: string;
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={name}
      rows={rows}
      placeholder={placeholder}
      {...register(name)}
      className={`block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm transition duration-150 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-amber-500 focus:ring-amber-500"
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

const CheckboxField = ({
  label,
  name,
  register,
}: {
  label: string;
  name: string;
  register: UseFormRegister<any>;
}) => (
  <div className="flex items-center space-x-2">
    <input
      id={name}
      type="checkbox"
      {...register(name)}
      className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
    />
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>
  </div>
);

// --- Mock Image Uploader Component (Simulates Cloudinary interaction) ---

const MockImageUploader = ({ name, control, imageUrl, setValue }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Mock function to simulate an upload and return a URL
  const handleMockUpload = (file) => {
    console.log(`Simulating upload of file: ${file.name}`);
    // In a real app, this would be an API call to Cloudinary
    const mockUrl = `https://placehold.co/400x300/a0a0a0/ffffff?text=Uploaded+${file.name.substring(
      0,
      10
    )}...`;
    setValue(name, mockUrl, { shouldValidate: true });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleMockUpload(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleMockUpload(file);
    }
  };

  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={`w-full p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors duration-200 ${
              isDragging
                ? "border-amber-500 bg-amber-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {field.value ? (
              <div className="relative w-full h-40">
                <img
                  src={field.value}
                  alt="Current Preview"
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src =
                      "https://placehold.co/400x300/e0e0e0/505050?text=Image+Failed";
                  }}
                />
                <button
                  type="button"
                  onClick={() => field.onChange("")}
                  className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white shadow-lg hover:bg-red-700 transition"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <CameraIcon className="w-8 h-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {isDragging ? "Drop here" : "Drag & drop or"}
                </p>
                <label className="text-sm font-medium text-amber-600 hover:text-amber-800 cursor-pointer">
                  Click to upload
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </>
            )}
          </div>
        )}
      />
      {imageUrl && <p className="text-xs text-gray-500 truncate">{imageUrl}</p>}
    </div>
  );
};

// --- Tab Content Components ---

const GeneralInfoTab = ({
  register,
  errors,
  control,
  watch,
  setValue,
}: {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Product Name"
        name="name"
        register={register}
        error={errors.name}
        placeholder="e.g., Modern Wooden Bed Frame"
      />
      <InputField
        label="SKU"
        name="sku"
        register={register}
        error={errors.sku}
        placeholder="e.g., BED-001-QUEEN"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Category"
        name="category"
        register={register}
        error={errors.category}
        placeholder="e.g., Furniture"
      />
      <InputField
        label="Subcategory"
        name="subcategory"
        register={register}
        error={errors.subcategory}
        placeholder="e.g., Beds"
      />
    </div>

    <TextAreaField
      label="Tagline (Short Description)"
      name="description.tagline"
      register={register}
      error={(errors.description as any)?.tagline}
      rows={2}
      placeholder="Brief, catchy description of the product"
    />
    <TextAreaField
      label="Long Description (Required)"
      name="description.long_description"
      register={register}
      error={(errors.description as any)?.long_description}
      placeholder="Detailed description including features, benefits, and specifications"
    />

    <h4 className="text-md font-semibold pt-4">Product Features</h4>
    <FeaturesArray register={register} control={control} errors={errors} />
  </div>
);

const PricingAndStockTab = ({ register, errors, watch, setValue }) => {
  const is_on_sale = watch("pricing.is_on_sale");
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2">Pricing</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Current Price (₹)"
          name="pricing.current_price"
          register={register}
          error={errors.pricing?.current_price}
          type="number"
          placeholder="e.g., 25000"
        />
        <InputField
          label="Original Price (₹)"
          name="pricing.original_price"
          register={register}
          error={errors.pricing?.original_price}
          type="number"
          placeholder="e.g., 30000"
        />
        <InputField
          label="Currency"
          name="pricing.currency"
          register={register}
          error={errors.pricing?.currency}
          placeholder="e.g., INR"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <CheckboxField
          label="Product is on Sale"
          name="pricing.is_on_sale"
          register={register}
        />
        {is_on_sale && (
          <>
            <InputField
              label="Discount Amount (₹)"
              name="pricing.discount"
              register={register}
              error={errors.pricing?.discount}
              type="number"
            />
            <InputField
              label="Discount Percent (%)"
              name="pricing.discount_percent"
              register={register}
              error={errors.pricing?.discount_percent}
              type="number"
            />
          </>
        )}
      </div>

      <h3 className="text-xl font-semibold border-b pb-2 pt-6">
        Stock & Shipping
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Available Quantity"
          name="stock.available_quantity"
          register={register}
          error={errors.stock?.available_quantity}
          type="number"
          placeholder="e.g., 50"
        />
        <InputField
          label="Estimated Delivery"
          name="stock.estimated_delivery"
          register={register}
          error={errors.stock?.estimated_delivery}
          placeholder="e.g., 5-7 business days"
        />
      </div>
      <div className="pt-4 space-y-3">
        <TextAreaField
          label="Shipping Policy"
          name="shipping_returns.shipping_policy"
          register={register}
          error={errors.shipping_returns?.shipping_policy}
          rows={2}
        />
        <TextAreaField
          label="Return Policy"
          name="shipping_returns.return_policy"
          register={register}
          error={errors.shipping_returns?.return_policy}
          rows={2}
        />
        <CheckboxField
          label="Assembly Service Available"
          name="shipping_returns.assembly_service"
          register={register}
        />
      </div>
    </div>
  );
};

const GalleryMediaTab = ({
  control,
  errors,
  setValue,
  register,
  watch,
}: {
  control: any;
  errors: any;
  setValue: any;
  register: any;
  watch: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media.images",
  });
  const mainImageWatch = watch("media.main_image");

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2">
        Main Product Image
      </h3>
      <div className="w-full">
        <MockImageUploader
          name="media.main_image"
          control={control}
          setValue={setValue}
          imageUrl={mainImageWatch}
        />
        {errors.media?.main_image && (
          <p className="mt-1 text-xs text-red-500">
            {errors.media.main_image.message}
          </p>
        )}
      </div>

      <h3 className="text-xl font-semibold border-b pb-2 pt-6">
        Product Image Gallery
      </h3>

      <div className="space-y-4">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-3 border rounded-lg bg-gray-50"
          >
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Image URL"
                name={`media.images.${index}.url`}
                register={register}
                error={errors.media?.images?.[index]?.url}
                placeholder="e.g., https://example.com/image.jpg"
              />
              <InputField
                label="Alt Text"
                name={`media.images.${index}.alt`}
                register={register}
                error={errors.media?.images?.[index]?.alt}
                placeholder="e.g., Modern wooden bed frame"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-red-500 hover:text-red-700 transition"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ url: "", alt: "" })}
          className="flex items-center justify-center w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Gallery Image
        </button>
      </div>
      {errors.media?.images && (
        <p className="mt-1 text-xs text-red-500">
          *At least one image is required for the gallery.
        </p>
      )}
    </div>
  );
};

const SpecsTab = ({ register, errors, watch }) => {
  const assemblyRequired = watch("specifications.assembly_required");
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2">
        Materials & Capacity
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Size / Primary Type"
          name="specifications.size"
          register={register}
          error={errors.specifications?.size}
          placeholder="e.g., Queen"
        />
        <InputField
          label="Frame Material"
          name="specifications.materials.frame"
          register={register}
          error={errors.specifications?.materials?.frame}
          placeholder="e.g., Solid Wood"
        />
        <InputField
          label="Support Material (e.g., Slats, Springs)"
          name="specifications.materials.support"
          register={register}
          error={errors.specifications?.materials?.support}
          placeholder="e.g., Wooden Slats"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Weight Capacity (kg)"
          name="specifications.weight_capacity_kg"
          register={register}
          error={errors.specifications?.weight_capacity_kg}
          type="number"
          placeholder="e.g., 200"
        />
        <InputField
          label="Warranty Period"
          name="specifications.warranty"
          register={register}
          error={errors.specifications?.warranty}
          placeholder="e.g., 5 years"
        />
      </div>

      <h3 className="text-xl font-semibold border-b pb-2 pt-6">
        Dimensions (cm)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InputField
          label="Overall (W x D x H)"
          name="specifications.dimensions_cm.overall"
          register={register}
          error={errors.specifications?.dimensions_cm?.overall}
        />
        <InputField
          label="Headboard Height"
          name="specifications.dimensions_cm.headboard_height"
          register={register}
          error={errors.specifications?.dimensions_cm?.headboard_height}
        />
        <InputField
          label="Footboard Height"
          name="specifications.dimensions_cm.footboard_height"
          register={register}
          error={errors.specifications?.dimensions_cm?.footboard_height}
        />
        <InputField
          label="Under-bed Clearance"
          name="specifications.dimensions_cm.clearance_under_bed"
          register={register}
          error={errors.specifications?.dimensions_cm?.clearance_under_bed}
        />
      </div>

      <h3 className="text-xl font-semibold border-b pb-2 pt-6">Assembly</h3>
      <CheckboxField
        label="Assembly Required"
        name="specifications.assembly_required"
        register={register}
      />
      {assemblyRequired && (
        <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
          *Remember to provide clear assembly instructions for the customer.
        </p>
      )}
    </div>
  );
};

const FeaturesArray = ({ register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "description.features",
  });

  return (
    <div className="space-y-3 p-3 border rounded-lg bg-gray-50">
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-center space-x-3">
          <InputField
            label={`Feature ${index + 1}`}
            name={`description.features.${index}`}
            register={register}
            error={errors.description?.features?.[index]}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-6 p-2 text-red-500 hover:text-red-700 transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append("")}
        className="flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 transition"
      >
        <PlusIcon className="w-4 h-4 mr-1" />
        Add Feature
      </button>
    </div>
  );
};

const VariantsTab = ({ control, errors, register, watch, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2">
        Product Variants (e.g., Size, Color)
      </h3>
      <p className="text-sm text-gray-600">
        Define groups of options that alter the product's SKU or price.
      </p>

      {fields.map((item, index) => (
        <div
          key={item.id}
          className="p-4 border border-amber-200 rounded-xl bg-amber-50 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h4 className="font-bold text-lg text-amber-800">
              Variant Group {index + 1}
            </h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-1 text-red-500 hover:text-red-700 transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <InputField
            label="Variant Type Name (e.g., 'Size', 'Color')"
            name={`variants.${index}.type`}
            register={register}
            error={errors.variants?.[index]?.type}
          />
          <VariantOptionsArray
            nestIndex={index}
            {...{ control, errors, register }}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => append(DEFAULT_VARIANT_GROUP)}
        className="flex items-center justify-center w-full py-2 border border-dashed border-amber-500 text-amber-600 rounded-lg hover:bg-amber-100 transition"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Variant Group
      </button>
    </div>
  );
};

const VariantOptionsArray = ({ nestIndex, control, errors, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${nestIndex}.options`,
  });

  return (
    <div className="space-y-3 p-3 border border-gray-200 rounded-lg bg-white">
      <h5 className="font-semibold text-sm border-b pb-2">Options</h5>
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-6 gap-3 p-2 border-b border-gray-100 last:border-b-0"
        >
          <div className="col-span-2">
            <InputField
              label="Value (e.g., 'Queen')"
              name={`variants.${nestIndex}.options.${index}.value`}
              register={register}
              error={errors.variants?.[nestIndex]?.options?.[index]?.value}
            />
          </div>
          <div>
            <InputField
              label="Price Adj. (₹)"
              name={`variants.${nestIndex}.options.${index}.price_adjust`}
              register={register}
              error={
                errors.variants?.[nestIndex]?.options?.[index]?.price_adjust
              }
              type="number"
            />
          </div>
          <div>
            <InputField
              label="SKU Suffix"
              name={`variants.${nestIndex}.options.${index}.sku_suffix`}
              register={register}
              error={errors.variants?.[nestIndex]?.options?.[index]?.sku_suffix}
            />
          </div>
          <div>
            <InputField
              label="Hex Code"
              name={`variants.${nestIndex}.options.${index}.hex_code`}
              register={register}
              error={errors.variants?.[nestIndex]?.options?.[index]?.hex_code}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="self-center mt-3 p-1 text-red-500 hover:text-red-700 transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ ...DEFAULT_VARIANT_OPTION })}
        className="flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 transition pt-2"
      >
        <PlusIcon className="w-4 h-4 mr-1" />
        Add Option
      </button>
    </div>
  );
};

// --- Main Form Component ---

const ProductForm = ({
  product,
  onClose,
}: {
  product?: any;
  onClose: () => void;
}) => {
  const defaultValues = useMemo(() => getDefaultValues(product), [product]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<any>({
    defaultValues,
  });

  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", name: "General Info", component: GeneralInfoTab },
    { id: "pricing", name: "Pricing & Stock", component: PricingAndStockTab },
    { id: "media", name: "Gallery & Media", component: GalleryMediaTab },
    { id: "specs", name: "Specifications", component: SpecsTab },
    { id: "variants", name: "Variants", component: VariantsTab },
  ];

  const CurrentTabComponent = tabs.find((t) => t.id === activeTab).component;

  const handleFormSubmit = (data) => {
    console.log("Submitting Product Data:", data);
    // Simulate API call delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // onSubmit && onSubmit(data);
        // onClose();
        resolve();
      }, 1500);
    });
  };

  const title = product
    ? `Edit Product: ${product.name}`
    : "Create New Product";

  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-background">
      <div className="bg-background h-[80vh] overflow-y-auto p-6 md:p-10 rounded-xl shadow-2xl w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-800 border-b pb-3 mb-6">
          {title}
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav
              className="-mb-px flex space-x-6 overflow-x-auto"
              aria-label="Tabs"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition duration-150 ${
                    activeTab === tab.id
                      ? "border-amber-600 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-96">
            <CurrentTabComponent
              register={register}
              errors={errors}
              control={control}
              watch={watch}
              setValue={setValue}
            />
          </div>

          {/* Submission Button */}
          <div className="flex justify-end pt-4 gap-5">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-lg font-semibold transition duration-200 shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition duration-200 shadow-md ${
                isSubmitting
                  ? "bg-amber-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isSubmitting
                ? product
                  ? "Saving Changes..."
                  : "Creating Product..."
                : product
                  ? "Save Product Changes"
                  : "Create Product"}
            </button>
          </div>
        </form>
        <div className="mt-8 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-700">Validation Errors:</h3>
          <pre className="text-xs text-red-600 overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(errors, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
