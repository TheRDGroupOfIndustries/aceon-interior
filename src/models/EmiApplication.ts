import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEMIApplication extends Document {
  // Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;
  
  // Loan/EMI Details
  interiorPackage: string;
  totalAmount: number;
  emiTenure: number;
  downPayment: number;
  calculatedEMI: number;
  
  // Financial Information
  monthlyIncome: number;
  employmentType: 'salaried' | 'self-employed' | 'other';
  bankDetails?: string;
  
  // Consent
  agreeTerms: boolean;
  agreeCreditCheck: boolean;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const EMIApplicationSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    interiorPackage: {
      type: String,
      required: [true, 'Interior package is required'],
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    emiTenure: {
      type: Number,
      required: [true, 'EMI tenure is required'],
      enum: [3, 6, 9, 12, 18, 24],
    },
    downPayment: {
      type: Number,
      default: 0,
      min: [0, 'Down payment cannot be negative'],
    },
    calculatedEMI: {
      type: Number,
      required: [true, 'Calculated EMI is required'],
      min: [0, 'EMI amount cannot be negative'],
    },
    monthlyIncome: {
      type: Number,
      required: [true, 'Monthly income is required'],
      min: [0, 'Monthly income cannot be negative'],
    },
    employmentType: {
      type: String,
      required: [true, 'Employment type is required'],
      enum: ['salaried', 'self-employed', 'other'],
    },
    bankDetails: {
      type: String,
      trim: true,
    },
    agreeTerms: {
      type: Boolean,
      required: [true, 'You must agree to terms and conditions'],
      validate: {
        validator: function(v: boolean) {
          return v === true;
        },
        message: 'You must agree to terms and conditions',
      },
    },
    agreeCreditCheck: {
      type: Boolean,
      required: [true, 'You must agree to credit check'],
      validate: {
        validator: function(v: boolean) {
          return v === true;
        },
        message: 'You must agree to credit check',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'under_review'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
EMIApplicationSchema.index({ email: 1, createdAt: -1 });
EMIApplicationSchema.index({ status: 1 });
EMIApplicationSchema.index({ createdAt: -1 });

const EMIApplication: Model<IEMIApplication> = 
  mongoose.models.EMIApplication || 
  mongoose.model<IEMIApplication>('EMIApplication', EMIApplicationSchema);

export default EMIApplication;