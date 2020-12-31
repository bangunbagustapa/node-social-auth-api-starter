import User from '../models/user';

import ErrorHandler from '../utils/error-handler';

export const getUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.user;
  const { name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name }, { new: true });

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }

    return res.status(200).json({ message: 'User account successfully deleted' });
  } catch (error) {
    return next(error);
  }
};
