import { TOrder, TUser } from './user.interface';
import User from './user.model';

const createUserIntoDb = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};
const updateUserIntoDb = async (userId: number, user: TUser) => {
  await User.updateOne({ userId }, { $set: user }, { new: true });

  const result = await User.findOne({ userId });
  return result;
};

const addOrderIntoDB = async (userId: number, order: TOrder) => {
  const result = await User.updateOne(
    { userId },
    {
      $set: {
        orders: order,
      },
    },
    { new: true },
  );
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};
const getUserByIdFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};
const deleteUserByIdIntoDb = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

const getOrdersFromUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};
const getTotalPriceByUserOrdersFromDB = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ]);
  return result;
};

const userServices = {
  createUserIntoDb,
  updateUserIntoDb,
  addOrderIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  deleteUserByIdIntoDb,
  getOrdersFromUserFromDB,
  getTotalPriceByUserOrdersFromDB,
};

export default userServices;
