import * as z from "zod";

export const studentSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  date_of_birth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date of birth",
  }),
  gender: z.enum(["M", "F", "O"]), // Matches your DB CHECK constraint [cite: 146]
  class_id: z.coerce.number().min(1, "Please select a class"),
  parent_name: z.string().optional(),
  parent_phone: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;