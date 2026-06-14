import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resumes';

export const uploadResume = async (formData: FormData) => {
  const response = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getResumes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateResume = async (id: string, data: { title?: string; role?: string; tags?: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteResume = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
