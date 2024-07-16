import joi from "joi";

export const userData = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().max(30).min(6).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
});

export const registerSchema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().max(30).min(6).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

export const loginSchema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().max(30).min(6).required(),
});
