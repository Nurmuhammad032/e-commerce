import express from "express";
import dotenv from "dotenv";
import importRoute from "./importRoute";
import productRoute from "./routes/productRoute";
import connectDatabase from "config/MongoDb";

dotenv.config();
const app = express();
// connectDatabase();

app.use("/api/import", importRoute);
app.use("/api/products", productRoute);
app.get("/", (req, res) => {
  res.send("api running");
});
console.log("hello");
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT} port`);
});
