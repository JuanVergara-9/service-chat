import { useEffect, useState } from "react";
import { getUsers } from "../features/users/api";
import { getProfile } from "../features/auth/api";
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
        const me = await getProfile();
        const allUsers = await getUsers();
        setAuthUser(me.user);
        setUsers(allUsers);
      } catch (err) {
        setError("No se pudieron cargar los usuarios. Por favor, intentá nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-amber-600">Cargando usuarios...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!authUser) return <p className="text-center mt-10">No se pudo cargar tu perfil.</p>;

  return (
    <div className="min-h-screen bg-amber-50 py-10 px-4 flex flex-col items-center pb-[40px]">
      <h1 className="text-3xl font-bold text-amber-700 mb-6">Usuarios conectados</h1>

      <div className="max-w-md mb-4">
        <UserCard id={authUser.id} name={authUser.name} isCurrentUser />
        <h2></h2>
      </div>

      <div className="max-w-md space-y-4">
        {users
          .filter((u) => u.id !== authUser.id)
          .map((user) => (
            <UserCard key={user.id} id={user.id} name={user.name} />
          ))}
      </div>
    </div>
  );
}

