import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (data: any) => {
  await axios.post(`${process.env.API_URL}/users`, data);
};

export const login = async (data: any) => {
  const response = await axios.post(`${process.env.API_URL}/auth/login`, data);
  const token = response.data.accessToken;

  await AsyncStorage.setItem("jwtToken", token);
};

export const saveProfile = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  await axios.post(`${process.env.API_URL}/babyprofiles`, data, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getBabies = async () => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.get(`${process.env.API_URL}/babyprofiles/users`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
  return result;
};
