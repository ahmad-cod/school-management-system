export interface StudentRecord {
  student_id: number;
  full_name: string;
  class_name: string;
  grade_level: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export const studentService = {
  async getAll(): Promise<StudentRecord[]> {
    const response = await fetch(`${API_BASE_URL}/students/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.statusText}`);
    }
    return response.json();
  },
};