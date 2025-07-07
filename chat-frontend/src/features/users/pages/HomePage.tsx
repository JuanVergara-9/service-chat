import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getUsers } from "../api";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((data) => {
      const filtered = data.filter((u: User) => u.id !== user?.id);
      setUsers(filtered);
    });
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Usuarios conectados</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Mostrar mi perfil */}
        <div className="bg-blue-50 border p-4 rounded-lg shadow w-60 text-center">
          <h2 className="text-xl font-semibold text-blue-700">Yo</h2>
          <p className="text-gray-600">{user?.username}</p>
        </div>

        {/* Cards de otros usuarios */}
        {users.map((u) => (
          <div key={u.id} className="bg-white border p-4 rounded-lg shadow w-60 text-center">
            <h2 className="text-lg font-semibold">{u.username}</h2>
            <button
              className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => navigate(`/chat/${u.id}`)}
            >
              Conversar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
