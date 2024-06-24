import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { login } from "@/store/authSlice";
import { useForm } from "react-hook-form";
import { useUserCookies } from "@/context/UserCookiesContext";
import { loginUser } from "@/services/auth";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { saveAccessToken, saveRefreshToken, saveUser } = useUserCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);
  
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginUser(data.email, data.password);
      saveAccessToken(response.access);
      saveRefreshToken(response.refresh);
      saveUser(response.user)
      dispatch(login());
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isLoggedin) {
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
