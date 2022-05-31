import express from 'express';
import customerController from './customer.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { customerStrategy } from '../../../middleware/strategy';
import { validateBody, schemas } from '../../../middleware/validator';

export const customerRouter = express.Router();
customerRouter.route('/register').post(sanitize(), customerController.addUser);
customerRouter.route('/getUserByEmailId').get(sanitize(), customerController.findUser);
customerRouter.route('/login').post(sanitize(),validateBody(schemas.loginSchema),customerStrategy, customerController.login);


// get all customer
customerRouter.route('/list').get(sanitize(), customerController.getAllCustomer);
customerRouter.route('/update').post(sanitize(), customerController.getCustomerUpdate);
customerRouter.route('/delete').delete(sanitize(),customerController.deleteCustomer);


