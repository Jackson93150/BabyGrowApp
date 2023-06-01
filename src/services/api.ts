import axios from "axios";

export const saveUser = async (data: any) => {
  await axios.post(`${process.env.API_URL}/users`, data);
};

export const login = async (data: any) => {
  await axios.post(`${process.env.API_URL}/auth/login`, data);
};
