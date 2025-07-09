import apiClient from "../../lib/apiClient";

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
}

export const getMessages = async (userId: number): Promise<Message[]> => {
  const res = await apiClient.get(`/conversations/${userId}`);
  return res.data;
};

export const sendMessage = async (receiverId: number, content: string) => {
  // 1. Obtener (o crear) conversación
  const convoRes = await apiClient.post(`/conversations/${receiverId}`);
  const conversationId = convoRes.data.id;

  // 2. Enviar mensaje
  const messageRes = await apiClient.post(`/messages/${conversationId}`, {
    content,
  });

  return messageRes.data;
};