import api from "../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const uploadResume = async (formData: FormData) => {
  const response = await api.post(
    "/api/resumes",
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getResumes = async () => {
  const response = await api.get(
    "/api/resumes",
    getAuthConfig()
  );

  return response.data;
};

export const updateResume = async (id: string, data: any) => {
  const response = await api.put(
    `/api/resumes/${id}`,
    data,
    getAuthConfig()
  );

  return response.data;
};

export const deleteResume = async (id: string) => {
  const response = await api.delete(
    `/api/resumes/${id}`,
    getAuthConfig()
  );

  return response.data;
};