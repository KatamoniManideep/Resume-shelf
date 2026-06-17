import api from "../api/axios";

export const uploadResume = async (formData: FormData) => {
  const response = await api.post('/api/resumes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getResumes = async () => {
  const response = await api.get('/api/resumes');
  return response.data;
};

export const updateResume = async (id: string, data: any) => {
  const response = await api.put(`/api/resumes/${id}`, data);
  return response.data;
};

export const deleteResume = async (id: string) => {
  const response = await api.delete(`/api/resumes/${id}`);
  return response.data;
};
