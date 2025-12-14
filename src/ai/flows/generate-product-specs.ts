'use server';
/**
 * @fileOverview Generates product specifications using AI.
 *
 * - generateProductSpecs - A function that generates product specifications based on title and description.
 * - GenerateProductSpecsInput - The input type for the generateProductSpecs function.
 * - GenerateProductSpecsOutput - The return type for the generateProductSpecs function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProductSpecsInputSchema = z.object({
  title: z.string().describe('The title of the product.'),
  description: z.string().describe('The description of the product.'),
});

export type GenerateProductSpecsInput = z.infer<
  typeof GenerateProductSpecsInputSchema
>;

const SpecSchema = z.object({
    name: z.string().describe("The name of the specification (e.g., 'Power', 'Weight')."),
    value: z.string().describe("The value of the specification (e.g., '110V', '5kg').")
});

const GenerateProductSpecsOutputSchema = z.array(SpecSchema).max(8).describe("An array of up to 8 key-value specifications for the product.");


export type GenerateProductSpecsOutput = z.infer<
  typeof GenerateProductSpecsOutputSchema
>;

export async function generateProductSpecs(
  input: GenerateProductSpecsInput
): Promise<GenerateProductSpecsOutput> {
  return generateProductSpecsFlow(input);
}

const generateProductSpecsPrompt = ai.definePrompt({
  name: 'generateProductSpecsPrompt',
  input: { schema: GenerateProductSpecsInputSchema },
  output: { schema: GenerateProductSpecsOutputSchema },
  prompt: `You are an expert at creating product specification tables for medical devices.

Based on the provided product title and description, generate a list of relevant technical specifications.

Only include factual specifications that can be reasonably inferred from the text. Do not invent features. If no clear specifications can be determined, return an empty array.

Title: {{{title}}}
Description: {{{description}}}`,
});

const generateProductSpecsFlow = ai.defineFlow(
  {
    name: 'generateProductSpecsFlow',
    inputSchema: GenerateProductSpecsInputSchema,
    outputSchema: GenerateProductSpecsOutputSchema,
  },
  async (input) => {
    const { output } = await generateProductSpecsPrompt(input);
    return output || [];
  }
);
