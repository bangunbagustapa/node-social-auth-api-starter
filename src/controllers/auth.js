import ErrorHandler from '../utils/error-handler';

export const google = (req, res) => {
  const { user } = req;

  const token = user.generateAccessToken();

  return res.status(200).send({ accessToken: token });
};

export const linkGoogle = (req, res) => res.status(200).send({ message: 'Successfully linked account with Google' });

export const unlinkGoogle = async (req, res, next) => {
  const { user } = req;

  try {
    if (!user.account.google.email) {
      throw new ErrorHandler(204, 'Google account already unlinked');
    }

    user.account.google.email = undefined;

    await user.save();

    res.status(200).send({ message: 'Successfully unlinked account with Google' });
  } catch (error) {
    next(error);
  }
};

export const facebook = (req, res) => {
  const { user } = req;

  const token = user.generateAccessToken();

  return res.status(200).send({ accessToken: token });
};

export const linkFacebook = (req, res) => res.status(200).send({ message: 'Successfully linked account with Facebook' });

export const unlinkFacebook = async (req, res, next) => {
  const { user } = req;

  try {
    if (!user.account.facebook.email) {
      throw new ErrorHandler(204, 'Facebook account already unlinked');
    }

    user.account.facebook.email = undefined;

    await user.save();

    res.status(200).send({ message: 'Successfully unlinked account with Facebook' });
  } catch (error) {
    next(error);
  }
};
