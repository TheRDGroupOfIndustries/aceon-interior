// --- User Model for NextAuth Google Provider ---

import { Model, model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    image: { type: String }, // Profile picture URL from Google
    provider: { type: String, default: "google" }, // OAuth provider
    providerId: { type: String, required: false }, // Google user ID
    // Additional fields for app-specific data
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: { type: String },
    address: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }], // Reference to user's orders
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }], // Reference to user's messages
  },
  { timestamps: true }
);

const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);
export default User;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: string;
  providerId: string;
  role: "user" | "admin";
  phone?: string;
  address?: string;
  orders: string[]; // Array of Order ObjectIds as strings
  createdAt: Date;
  updatedAt: Date;
}
