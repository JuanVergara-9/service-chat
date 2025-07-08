// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { getUsers } from "../features/users/api";
import { getProfile } from "../features/auth/api"; // ✅ Corrección
import UserCard from "../features/users/components/UserCard";
import type { User } from "../features/auth/types";

export default function HomePage() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const me = await getProfile();
        const allUsers = await getUsers();
        setAuthUser(me.user);
        setUsers(allUsers);
        setError(null);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
        setError("No se pudieron cargar los usuarios. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando usuarios...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!authUser) return <p className="text-center mt-10">No se pudo cargar tu perfil.</p>;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center gap-8 p-8">
      <h1 className="text-3xl font-bold text-amber-700">Usuarios conectados</h1>

      <UserCard id={authUser.id} name={authUser.username} isCurrentUser />

      <div className="flex flex-col gap-4 mt-6">
        {users
          .filter((u) => u.id !== authUser.id)
          .map((user) => (
            <UserCard key={user.id} id={user.id} name={user.username} />
          ))}
      </div>
    </div>
  );
}
