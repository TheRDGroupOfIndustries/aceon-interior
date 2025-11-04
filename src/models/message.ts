import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  number?: string;
  address?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    number: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    reply: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);


MessageSchema.index({ email: 1, createdAt: -1 });
MessageSchema.index({ createdAt: -1 });

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;