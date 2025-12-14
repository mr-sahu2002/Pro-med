// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Validates product details (title and description) using AI.
 *
 * - validateProductDetails - A function that validates the product details.
 * - ValidateProductDetailsInput - The input type for the validateProductDetails function.
 * - ValidateProductDetailsOutput - The return type for the validateProductDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateProductDetailsInputSchema = z.object({
  title: z.string().describe('The title of the product.'),
  description: z.string().describe('The description of the product.'),
});

export type ValidateProductDetailsInput = z.infer<
  typeof ValidateProductDetailsInputSchema
>;

const ValidateProductDetailsOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the product details are valid.'),
  reason: z.string().describe('The reason why the product details are invalid, if applicable.'),
});

export type ValidateProductDetailsOutput = z.infer<
  typeof ValidateProductDetailsOutputSchema
>;

export async function validateProductDetails(
  input: ValidateProductDetailsInput
): Promise<ValidateProductDetailsOutput> {
  return validateProductDetailsFlow(input);
}

const validateProductDetailsPrompt = ai.definePrompt({
  name: 'validateProductDetailsPrompt',
  input: {schema: ValidateProductDetailsInputSchema},
  output: {schema: ValidateProductDetailsOutputSchema},
  prompt: `You are an expert product validator for an e-commerce website.

You will receive the product title and description. You must validate that the product title and description are appropriate and accurate.

Respond with isValid as true if the title and description are valid. Otherwise, respond with isValid as false and provide a reason.

Title: {{{title}}}
Description: {{{description}}}`,
});

const validateProductDetailsFlow = ai.defineFlow(
  {
    name: 'validateProductDetailsFlow',
    inputSchema: ValidateProductDetailsInputSchema,
    outputSchema: ValidateProductDetailsOutputSchema,
  },
  async input => {
    const {output} = await validateProductDetailsPrompt(input);
    return output!;
  }
);
