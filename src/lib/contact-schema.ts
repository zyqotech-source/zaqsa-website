import { z } from "zod";

/** One definition of a valid consultation request, shared by the form and the server route. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d\s()-]*$/, "Use digits only")
    .optional(),
  company: z.string().trim().max(120).optional(),
  need: z.string().min(1, "Choose what you need").max(120).default(""),
  industry: z.string().max(120).optional(),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

export type ContactRequest = z.infer<typeof contactSchema>;
