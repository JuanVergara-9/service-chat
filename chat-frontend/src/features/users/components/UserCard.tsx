import { useNavigate } from "react-router-dom";
import type { User } from "../../auth/types";

interface UserCardProps extends Pick<User, "id" | "name"> {
  isCurrentUser?: boolean;
}

export default function UserCard({ id, name, isCurrentUser }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div className="w-[400px] max-w-md bg-white rounded-2xl shadow-md border border-amber-100 p-4 flex justify-between items-center hover:shadow-lg transition p-[7px]">
      <div>
        <p className="text-lg font-semibold text-amber-700 pl-[10px]">{name}</p>
        {isCurrentUser && (
          <p className="text-sm text-gray-500 italic"> Usuarios (Online) para conversar en tiempo real</p>
        )}
      </div>
      {!isCurrentUser && (
        <button
          onClick={() => navigate(`/chat/${id}`)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transitio"
        >
          Conversar
        </button>
      )}
    </div>
  );
}
