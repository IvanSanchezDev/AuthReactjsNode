import { body } from 'express-validator'

export const loginValidator = [

  body('username')
    .notEmpty()
    .isString()
    .withMessage('el nombre debe ser de tipo string'),
  body('password')
    .notEmpty()
    .isString()
    .withMessage('la contraseña debe ser de tipo string')
]