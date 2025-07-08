// src/features/auth/components/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.username, data.email, data.password);
    } catch (err) {
      alert("Error en el registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6 border border-amber-200"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-700 mb-2">Crear cuenta</h2>
          <p className="text-sm text-gray-500">Completá el formulario para registrarte</p>
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Nombre de usuario</label>
          <input
            {...register("username", { required: "Requerido" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Email</label>
          <input
            {...register("email", { required: "Requerido" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Contraseña</label>
          <input
            type="password"
            {...register("password", { required: "Requerido" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Registrarse
        </button>

        <p className="text-sm text-center mt-4">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
