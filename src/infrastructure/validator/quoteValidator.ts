import { body } from 'express-validator';

export const quoteValidator = () => [
    body('recipient.address.zipcode')
        .notEmpty()
        .withMessage('Recipient address zipcode is required'),
    body('volumes')
        .isArray({ min: 1 })
        .withMessage('At least one volume is required'),
    body('volumes.*.category')
        .notEmpty()
        .withMessage('Volume category is required'),
    body('volumes.*.amount')
        .notEmpty()
        .withMessage('Volume amount is required'),
    body('volumes.*.unitary_weight')
        .notEmpty()
        .withMessage('Volume unitary weight is required'),
    body('volumes.*.price')
        .notEmpty()
        .withMessage('Volume price is required'),
    body('volumes.*.sku')
        .notEmpty()
        .withMessage('Volume SKU is required'),
    body('volumes.*.height')
        .notEmpty()
        .withMessage('Volume height is required'),
    body('volumes.*.width')
        .notEmpty()
        .withMessage('Volume width is required'),
    body('volumes.*.length')
        .notEmpty()
        .withMessage('Volume length is required'),
];