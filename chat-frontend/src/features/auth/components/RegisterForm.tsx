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
    <div className="min-h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-gray-900 p-10"
      >
        <div className="text-center space-y-2 ">
          <h2 className="text-3xl font-bold text-amber-700 font-serif">
            Crear cuenta
          </h2>
          <p className="text-sm text-gray-500">
            Completá el formulario para registrarte
          </p>
        </div>

        {/* Nombre de usuario */}
        <div className="relative pb-[20px]">
          <input
            {...register("username", { required: "Nombre requerido" })}
            placeholder="Nombre de usuario"
            className="w-full h-[23px] pl-11 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative pb-[20px]">
          <input
            {...register("email", { required: "Email requerido" })}
            placeholder="Correo electrónico"
            className="w-full h-[23px] pl-11 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Contraseña */}
        <div className="relative pb-[20px]">
          <input
            type="password"
            {...register("password", { required: "Contraseña requerida" })}
            placeholder="Contraseña"
            className="w-full h-[23px] pl-11 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
          >
            Registrarse
          </button>
        </div>

        <p className="text-sm text-center pt-2 text-gray-600">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Iniciá sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
