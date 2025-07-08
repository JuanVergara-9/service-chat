// src/features/auth/components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6 border border-amber-200"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-700 mb-2">Iniciar sesión</h2>
          <p className="text-sm text-gray-500">Ingresá tus credenciales para continuar</p>
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Email</label>
          <input
            {...register("email", { required: "Email requerido" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Contraseña</label>
          <input
            type="password"
            {...register("password", { required: "Contraseña requerida" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
        >
          Ingresar
        </button>

        <p className="text-sm text-center mt-4">
          ¿No tenés una cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
}
