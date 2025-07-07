import { useNavigate } from "react-router-dom";

interface UserCardProps {
  id: number;
  name: string;
  isCurrentUser?: boolean;
}

export default function UserCard({ id, name, isCurrentUser }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border flex items-center justify-between w-full max-w-md">
      <div>
        <p className="text-lg font-semibold">{name}</p>
        {isCurrentUser && <p className="text-sm text-gray-500">(Sos vos)</p>}
      </div>
      {!isCurrentUser && (
        <button
          onClick={() => navigate(`/chat/${id}`)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md"
        >
          Conversar
        </button>
      )}
    </div>
  );
}
