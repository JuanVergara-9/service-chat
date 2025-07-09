// src/features/auth/api.ts
import apiClient from "../../lib/apiClient";
import type { AuthResponse } from "./types";

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data;
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await apiClient.post("/auth/register", { name, email, password });
  return res.data;
}

export async function getProfile(): Promise<{ user: AuthResponse["user"] }> {
  const res = await apiClient.get("/auth/me");
  return res.data;
}
