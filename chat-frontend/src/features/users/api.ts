// src/features/users/api.ts
import apiClient from "../../lib/apiClient";

export const getUsers = async () => {
  const res = await apiClient.get("/users");
  return res.data;
};
