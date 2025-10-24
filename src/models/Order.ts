// --- Sub-Schemas ---

import { model, models, Schema } from "mongoose";

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
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    variant: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    paymentMethod: { type: String, required: true },
    grandTotal: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;

export interface IOrder {
  _id: string;
  product: string; 
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
  createdAt: Date;
  updatedAt: Date;
}
