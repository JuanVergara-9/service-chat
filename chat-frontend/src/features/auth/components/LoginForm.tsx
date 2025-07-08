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
    <div className="min-h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-gray-900 p-10"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-amber-700 font-serif">
            Iniciar sesión
          </h2>
          <p className="text-sm text-gray-600">
            Ingresá tus credenciales para continuar
          </p>
        </div>

        {/* Email */}
        <div className="relative pb-[20px]">
          <input
            {...register("email", { required: "Email requerido" })}
            placeholder="Correo electrónico"
            className="w-full h-[25px] pl-11 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="relative pb-[20px]">
          <input
            type="password"
            {...register("password", { required: "Contraseña requerida" })}
            placeholder="Contraseña"
            className="w-full h-[25px] pl-11 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition font-semibold"
        >
          Ingresar
        </button>

        <p className="text-sm text-center pt-2 text-gray-600">
          ¿No tenés una cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
}
