import joi from 'joi';

const signUpSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  pictureURL: joi.string().uri().required()
});

export default signUpSchema;