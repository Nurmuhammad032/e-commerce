import bcrypt from "bcryptjs";
import mongoose, { InferSchemaType } from "mongoose";
import { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define the interface for user documents
export interface IUser extends InferSchemaType<typeof userSchema> {
  _id: Types.ObjectId;
  matchPassword(enterPassword: string): Promise<boolean>;
}

// Login, Method to compare entered password with the stored hashed password
userSchema.methods.matchPassword = async function (enterPassword: string) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
