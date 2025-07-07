import apiClient from "../../../lib/apiClient";
import type { User } from "../types";

export async function getUsers(): Promise<User[]> {
  const res = await apiClient.get("/users");
  return res.data;
}
