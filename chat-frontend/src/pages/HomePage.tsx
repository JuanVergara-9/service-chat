// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { getUsers } from "../features/users/api";
import { getAuthUser } from "../features/auth/api";
import UserCard from "../features/users/components/UserCard";

interface User {
  id: number;
  name: string;
}

export default function HomePage() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const me = await getAuthUser();
      const allUsers = await getUsers();
      setAuthUser(me);
      setUsers(allUsers);
    };

    fetchData();
  }, []);

  if (!authUser) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center gap-8 p-8">
      <h1 className="text-3xl font-bold text-amber-700">Usuarios conectados</h1>

      <UserCard id={authUser.id} name={authUser.name} isCurrentUser />

      <div className="flex flex-col gap-4 mt-6">
        {users
          .filter((u) => u.id !== authUser.id)
          .map((user) => (
            <UserCard key={user.id} id={user.id} name={user.name} />
          ))}
      </div>
    </div>
  );
}
