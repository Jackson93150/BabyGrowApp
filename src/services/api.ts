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

export const updateUser = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  await axios.put(`${process.env.API_URL}/users/me`, data, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
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

export const saveVaccin = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  await axios.post(`${process.env.API_URL}/vaccinations`, data, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const saveWeight = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  await axios.post(`${process.env.API_URL}/babyweight`, data, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const saveHeight = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  await axios.post(`${process.env.API_URL}/babyHeight`, data, {
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
  return result.data;
};

export const getWeight = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.get(
    `${process.env.API_URL}/babyweight/${data}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return result.data;
};

export const getHeight = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.get(
    `${process.env.API_URL}/babyHeight/${data}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return result.data;
};

export const getVaccins = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.get(
    `${process.env.API_URL}/vaccinations/${data}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return result.data;
};

export const edditVaccin = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.put(`${process.env.API_URL}/vaccinations`, data, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
  return result.data;
};

export const edditWeight = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.put(`${process.env.API_URL}/babyweight`, data, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
  return result.data;
};

export const edditHeight = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.put(`${process.env.API_URL}/babyHeight`, data, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
  return result.data;
};

export const deleteVaccin = async (data: any) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.delete(`${process.env.API_URL}/vaccinations/${data}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
  return result.data;
};

export const getMe = async () => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");
  const result = await axios.get(`${process.env.API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const getRecipes = async () => {
  const result = await axios.get(
    `${process.env.STRAPI_URL}/api/recette?populate=*,recette.cover`
  );
  return result.data;
};

export const getBlogs = async () => {
  const result = await axios.get(
    `${process.env.STRAPI_URL}/api/blog?populate=*,blog.cover,blog.categorie`
  );
  return result.data;
};

export const getActivity = async () => {
  const result = await axios.get(
    `${process.env.STRAPI_URL}/api/activity?populate=*,activity.cover`
  );
  return result.data;
};
