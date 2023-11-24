import express from 'express';
import userControllers from './user.controller';

const router = express.Router();
router.post('/', userControllers.createUser);
router.put('/:userId', userControllers.updateUser);
router.get('/', userControllers.getAllUsers);
router.get('/:userId', userControllers.getUserById);
router.delete('/:userId', userControllers.deleteUserById);
// orders
router.put('/:userId/orders', userControllers.addOrder);
router.get('/:userId/orders', userControllers.getOrdersFromUser);
router.get(
  '/:userId/orders/total-price',
  userControllers.getTotalPriceByUserOrders,
);

export const userRouter = router;
