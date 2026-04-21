"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { studentSchema, StudentFormValues } from "@/lib/validations/student";
import { studentService } from "@/services/studentService";

export default function AddStudentModal({
  classes,
  setStudentsData,
}: {
  classes: { class_id: number; class_name: string }[];
  setStudentsData: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormValues) => {
    console.log("Submitting student data:", data);
    try {
      await studentService.create(data);
      const newStudent = {
        student_id: Date.now(), // Temporary ID for UI purposes
        full_name: `${data.first_name} ${data.last_name}`,
        class_name: classes.find((c) => c.class_id === data.class_id)?.class_name || "Unknown",
        grade_level: parseInt(classes.find((c) => c.class_id === data.class_id)?.class_name.split(" ")[1] || "0"),
      };
      setStudentsData((prev) => [...prev, newStudent]);
      toast.success("Student added successfully!");
      reset();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <UserPlus size={18} /> Add New Student
      </button>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-black/50 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Register New Student</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors:", errors);
          })}
          className="p-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                {...register("first_name")}
                className="w-full border rounded-md p-2"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                {...register("last_name")}
                className="w-full border rounded-md p-2"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                {...register("date_of_birth")}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                {...register("gender")}
                className="w-full border rounded-md p-2"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Class Assignment
            </label>
            <select
              {...register("class_id", { valueAsNumber: true })}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select a Class</option>
              {classes.map((c) => (
                <option key={c.class_id} value={c.class_id}>
                  {c.class_name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Student"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
