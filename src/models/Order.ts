// --- Sub-Schemas ---

import { Model, model, models, Schema } from "mongoose";
import { IProduct } from "./Product";

// Schema for shipping address
const AddressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

// --- Main Order Schema ---

const OrderSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true, min: 1 },
    variant: { type: Object, required: true },
    address: { type: AddressSchema, required: true },
    paymentMethod: { type: String, required: true },
    grandTotal: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
    cancelReason: { type: String },
  },
  { timestamps: true }
);

const Order =
  (models.Order as Model<IOrder>) || model<IOrder>("Order", OrderSchema);
export default Order;

export interface IOrder {
  _id: string;
  productId: IProduct | string; // ObjectId as string
  userId: string; // ObjectId as string
  quantity: number;
  variant: string;
  address: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  grandTotal: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
