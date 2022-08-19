import * as Joi from 'joi';
import { IUserLogin } from '../interface/IUserLogin';

const runSchema = (user: IUserLogin) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  const { error, value } = schema.validate(user);

  if (error) {
    error.message = 'All fields must be filled';
    throw error;
  }

  return value;
};

export default runSchema;
