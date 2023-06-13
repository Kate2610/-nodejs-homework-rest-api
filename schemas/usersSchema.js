const Joi = require('joi');

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

const registerSchema = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2 }).pattern(emailPattern).messages({
    'string.email': 'Invalid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().pattern(passwordPattern).messages({
    'string.pattern': 'Password must be 8-16 symbols and contains a-z,A-Z,0-9,!@#-*()',
    'any.required': 'Password is required',
  }),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid('starter', 'pro', 'business').messages({
    'string.valid': 'Subscription must be one of starter,pro or business',
    'any.required': 'Subscription is required',
  }),
});

module.exports = { registerSchema, subscriptionSchema };