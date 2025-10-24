// --- User Model for NextAuth Google Provider ---

import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }, // Profile picture URL from Google
    provider: { type: String, default: "google" }, // OAuth provider
    providerId: { type: String, required: false }, // Google user ID
    // Additional fields for app-specific data
    role: { type: String, enum: ["user", "admin"], default: "user" },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }], // Reference to user's orders
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  provider: string;
  providerId: string;
  role: "user" | "admin";
  orders: string[]; // Array of Order ObjectIds as strings
  createdAt: Date;
  updatedAt: Date;
}
