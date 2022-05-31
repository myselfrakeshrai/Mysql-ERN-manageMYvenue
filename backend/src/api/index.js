import express from 'express';
import { authRouter } from './resources/auth'
import { productRouter } from './resources/product'
import { vendorRouter } from './resources/vendor'
import { categoryRouter } from './resources/category'
import { locationRouter } from './resources/location'
import { customerRouter } from './resources/customer';
import { orderRouter } from './resources/order';
import { paymentRouter } from './resources/payment';

 
export const restRouter = express.Router();
restRouter.use('/auth', authRouter);
restRouter.use('/customer', customerRouter);
restRouter.use('/location', locationRouter);
restRouter.use('/product', productRouter);
restRouter.use('/vendor', vendorRouter);
restRouter.use('/category', categoryRouter);
restRouter.use('/order', orderRouter);
restRouter.use('/payment', paymentRouter);






