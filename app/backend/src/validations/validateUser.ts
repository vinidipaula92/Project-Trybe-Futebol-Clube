import * as Joi from 'joi';
import { IUserLogin } from '../interface/IUserLogin';
import ValidationError from './ValidationError';

const runSchema = (user: IUserLogin) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  const { error, value } = schema.validate(user);

  if (error) {
    throw new ValidationError(400, 'All fields must be filled');
  }

  return value;
};

export default runSchema;
