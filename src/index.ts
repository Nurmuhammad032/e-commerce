import express from "express";
import dotenv from "dotenv";
import importRoute from "./importRoute";
import productRoute from "./routes/productRoute";
import userRoute from "./routes/userRoute";
import orderRoute from "./routes/orderRoute";
import connectDatabase from "./config/MongoDb";
import { errorHandler, notFound } from "./middleware/error";
dotenv.config();

const app = express();

// Middleware
// ==============================
app.use(express.json());

connectDatabase();

// Routes
// ==============================
app.use("/api/import", importRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

// Error handler middleware
// ==============================
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT} port`);
});
