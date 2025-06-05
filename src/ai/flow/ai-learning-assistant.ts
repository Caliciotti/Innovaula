'use server';

/**
 * @fileOverview AI learning assistant that provides intelligent feedback on student submissions.
 *
 * - intelligentAssignmentFeedback - A function that provides feedback on assignments.
 * - IntelligentAssignmentFeedbackInput - The input type for the intelligentAssignmentFeedback function.
 * - IntelligentAssignmentFeedbackOutput - The return type for the intelligentAssignmentFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentAssignmentFeedbackInputSchema = z.object({
  submissionText: z
    .string()
    .describe('The text of the student assignment submission.'),
  assignmentDescription: z
    .string()
    .describe('The description of the assignment.'),
  relevantContext: z
    .string()
    .optional()
    .describe('Any relevant context or instructions for the assignment.'),
});
export type IntelligentAssignmentFeedbackInput = z.infer<
  typeof IntelligentAssignmentFeedbackInputSchema
>;

const IntelligentAssignmentFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The AI-generated feedback on the submission.'),
  suggestions: z
    .string()
    .describe('AI suggestions for improvement with resources.'),
});
export type IntelligentAssignmentFeedbackOutput = z.infer<
  typeof IntelligentAssignmentFeedbackOutputSchema
>;

export async function intelligentAssignmentFeedback(
  input: IntelligentAssignmentFeedbackInput
): Promise<IntelligentAssignmentFeedbackOutput> {
  return intelligentAssignmentFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentAssignmentFeedbackPrompt',
  input: {schema: IntelligentAssignmentFeedbackInputSchema},
  output: {schema: IntelligentAssignmentFeedbackOutputSchema},
  prompt: `You are an AI learning assistant that provides feedback and recommendations on student assignment submissions.

  Given the following student submission, assignment description, and relevant context, provide feedback and suggestions for improvement.

  Submission:
  {{submissionText}}

  Assignment Description:
  {{assignmentDescription}}

  Relevant Context:
  {{relevantContext}}

  Provide specific and actionable feedback, and include suggestions for improvement with resources.
  Be encouraging and supportive in your feedback.
  Format the suggestions as a list of actionable items.
  `,
});

const intelligentAssignmentFeedbackFlow = ai.defineFlow(
  {
    name: 'intelligentAssignmentFeedbackFlow',
    inputSchema: IntelligentAssignmentFeedbackInputSchema,
    outputSchema: IntelligentAssignmentFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
