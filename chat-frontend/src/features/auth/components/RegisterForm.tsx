import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Crear cuenta</h2>

      <div>
        <label className="block mb-1 font-medium">Nombre de usuario</label>
        <input
          {...register("username", { required: "Requerido" })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          {...register("email", { required: "Requerido" })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Contraseña</label>
        <input
          type="password"
          {...register("password", { required: "Requerido" })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Registrarse
      </button>
    </form>
  );
}
