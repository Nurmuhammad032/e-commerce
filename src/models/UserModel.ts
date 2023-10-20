import bcrypt from "bcryptjs";
import mongoose, { InferSchemaType } from "mongoose";

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
interface User extends InferSchemaType<typeof userSchema> {
  matchPassword(enterPassword: string): Promise<boolean>;
}

// Login
userSchema.methods.matchPassword = async function (enterPassword: string) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model<User>("User", userSchema);

export default User;
