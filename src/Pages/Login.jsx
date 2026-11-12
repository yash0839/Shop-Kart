import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { RiErrorWarningLine, RiInformationLine, RiLockPasswordLine } from "@remixicon/react";
import PasswordInput from "../Components/PasswordInput";
import { useAuth } from "../context/AuthContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");

  const redirectTo = location.state?.from?.pathname || "/";
  const notice = location.state?.message;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setServerError("");
    const result = await login(data);
    if (result.ok) navigate(redirectTo, { replace: true });
    else setServerError(result.error);
  };

  if (user) return <Navigate to={redirectTo} replace />;

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white"><RiLockPasswordLine size={28} /></span>
          <h1 className="text-2xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="mt-1 text-sm text-gray-500">Log in to your Shop-Kart account</p>
        </div>

        {notice && <div className="alert alert-warning mb-4 flex items-center gap-2 py-2 text-sm"><RiInformationLine size={18} /> {notice}</div>}
        {serverError && <div className="alert alert-danger mb-4 flex items-center gap-2 py-2 text-sm" role="alert"><RiErrorWarningLine size={18} /> {serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="form-label text-sm font-semibold">Email</label>
            <input
              id="email" type="email" autoComplete="email" placeholder="you@example.com"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
              })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600" role="alert">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="form-label text-sm font-semibold">Password</label>
            <PasswordInput
              id="password" autoComplete="current-password" placeholder="Enter your password"
              hasError={Boolean(errors.password)}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600" role="alert">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-danger w-full py-2.5 font-semibold">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account? <Link to="/register" className="font-semibold text-red-600 hover:underline">Sign up</Link>
        </p>
        <p className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
          <strong>Demo only:</strong> accounts are stored in this browser&apos;s localStorage. This is not production authentication - never reuse a real password here.
        </p>
      </div>
    </div>
  );
};

export default Login;
