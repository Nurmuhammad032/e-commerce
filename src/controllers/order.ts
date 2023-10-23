import { handleError } from "./../utils/handleError";
import { Request } from "express";
import asyncHandler from "express-async-handler";
import Order, { IOrder } from "../models/OrderModel";

/**
 * Create order
 * @route POST /api/orders
 * @access Private
 **/
export const createOrder = asyncHandler(
  async (req: Request<{}, {}, IOrder>, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems.length === 0) {
      handleError(res, 400, "No order items");
    } else {
      const orders = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createOrder = await orders.save();
      res.status(201).json(createOrder);
    }
  }
);

/**
 * Get order
 * @route GET /api/orders/:id
 * @access Private
 **/
export const getOrder = asyncHandler(
  async (req: Request<{ id: string }, {}, IOrder>, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      handleError(res, 404, "Order not found");
    }
  }
);

/**
 * Pay for the order
 * @route PUT /api/orders/:id/pay
 * @access Private
 **/
export const payOrder = asyncHandler(
  async (
    req: Request<
      { id: string },
      {},
      Pick<IOrder, "paymentResult">["paymentResult"]
    >,
    res
  ) => {
    const { id, status, update_time, email_address } = req.body!;

    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id,
        status,
        update_time,
        email_address,
      };
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      handleError(res, 404, "Order not found");
    }
  }
);
