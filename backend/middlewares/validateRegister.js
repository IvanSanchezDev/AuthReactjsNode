import { body } from 'express-validator'

export const registerValidator = [

  body('username')
    .notEmpty()
    .isString()
    .withMessage('el nombre debe ser de tipo string'),
  body('password')
    .notEmpty()
    .isString()
    .withMessage('la contraseña debe ser de tipo string'),
  body('rol')
    .notEmpty()
    .isNumeric()
    .withMessage('el rol debe ser de tipo numerico (0 o 1)'),
  body('permisos')
    .isArray()
    .optional()
    .withMessage('los permisos son de tipo array'),
  body('permisos.*').isString().withMessage('las permisos son de tipo string')
]