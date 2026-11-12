import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RiCheckboxCircleFill, RiErrorWarningLine, RiUserAddLine } from "@remixicon/react";
import PasswordInput from "../Components/PasswordInput";
import { useAuth } from "../context/AuthContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const { user, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ name, email, password }) => {
    setServerError("");
    const result = await registerUser({ name, email, password });
    if (!result.ok) {
      setServerError(result.error);
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white"><RiUserAddLine size={28} /></span>
          <h1 className="text-2xl font-extrabold text-gray-900">Create Account</h1>
          <p className="mt-1 text-sm text-gray-500">Join Shop-Kart in a few seconds</p>
        </div>

        {success && (
          <div className="alert alert-success mb-4 flex items-center gap-2 py-2 text-sm" role="status">
            <RiCheckboxCircleFill size={18} /> Account created! Redirecting to login...
          </div>
        )}
        {serverError && <div className="alert alert-danger mb-4 flex items-center gap-2 py-2 text-sm" role="alert"><RiErrorWarningLine size={18} /> {serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="name" className="form-label text-sm font-semibold">Full name</label>
            <input
              id="name" type="text" autoComplete="name" placeholder="Your full name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600" role="alert">{errors.name.message}</p>}
          </div>

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
              id="password" autoComplete="new-password" placeholder="At least 8 characters"
              hasError={Boolean(errors.password)}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                validate: (value) => (/[A-Za-z]/.test(value) && /\d/.test(value)) || "Use at least one letter and one number",
              })}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600" role="alert">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="form-label text-sm font-semibold">Confirm password</label>
            <PasswordInput
              id="confirmPassword" autoComplete="new-password" placeholder="Re-enter your password"
              hasError={Boolean(errors.confirmPassword)}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === getValues("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600" role="alert">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting || success} className="btn btn-danger w-full py-2.5 font-semibold">
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="font-semibold text-red-600 hover:underline">Log in</Link>
        </p>
        <p className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
          <strong>Demo only:</strong> your account is saved in this browser&apos;s localStorage, not on a server. This is not production authentication.
        </p>
      </div>
    </div>
  );
};

export default Register;
