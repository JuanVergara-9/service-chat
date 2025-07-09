import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../features/chat/api"; // vas a crearlos
import { useAuth } from "../context/AuthContext";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
}

export default function ChatPage() {
  const { id: otherUserId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await getMessages(Number(otherUserId));
      setMessages(res);
    } catch (err) {
      console.error("Error al cargar mensajes", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = await sendMessage(Number(otherUserId), input);
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  useEffect(() => {
    fetchMessages();
  }, [otherUserId]);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <div className="bg-amber-600 text-white px-6 py-3 text-lg font-semibold shadow">
        Chat con usuario #{otherUserId}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.senderId === user?.id
                ? "bg-amber-300 self-end ml-auto"
                : "bg-white border border-amber-200"
            }`}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-amber-300 rounded-md px-4 py-2 outline-none"
          placeholder="Escribí un mensaje..."
        />
        <button
          onClick={handleSend}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
