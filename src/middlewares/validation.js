import { body, validationResult } from 'express-validator';

import ErrorHandler from '../utils/error-handler';

export const updateUserValidationRules = [
  body('name')
    .not().isEmpty()
    .withMessage('name is required'),
];

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    title: error.msg,
    param: error.param,
    location: error.location,
  }),
});

export const validate = (type) => async (req, res, next) => {
  let validationRules;

  switch (type) {
    case 'update-user':
      validationRules = updateUserValidationRules;
      break;
    default:
      validationRules = null;
  }

  try {
    if (!validationRules) {
      throw new ErrorHandler(400, 'Validate type is not valid. Options: \'update-user\'');
    }

    await Promise.all(validationRules.map((validationRule) => validationRule.run(req)));

    const errors = myValidationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const error = {
      statusCode: 400,
      message: errors.array(),
    };

    return next(error);
  } catch (error) {
    return next(error);
  }
};
