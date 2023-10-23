import express, { Response, Request } from "express";
import { createOrder, getOrder, payOrder } from "../controllers/order";
import IRequest from "../types/customRequest";
import protect from "../middleware/authMiddleware";

const router = express.Router();

// Retrieve all products
router.post("/", protect, createOrder);
router.post("/:id", protect, getOrder);
router.post("/:id/pay", protect, payOrder);

export default router;
