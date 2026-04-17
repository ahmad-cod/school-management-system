export interface ClassOption {
  class_id: number;
  class_name: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";


export const classService = {
  getAll: async (): Promise<ClassOption[]> => {
    const response = await fetch(`${API_BASE_URL}/classes`);
    if (!response.ok) throw new Error("Failed to load classes");
    return response.json();
  }
};