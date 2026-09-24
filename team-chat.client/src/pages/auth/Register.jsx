import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import AuthCard from "../../components/AuthCard";
import FormField from "../../components/FormField";

function Register() {
    const { formData, error, loading,
        handleChange, handleSubmit } = useRegister();

    return (
        <AuthCard
            title="Create your account"
            subtitle="Register to start chatting with your team."
            error={error}
            footer={
                <>
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-black hover:text-indigo-500">
                        Log in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormField
                    label="Full name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    maxLength={50}
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@gmail.com"
                    maxLength={50}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Password"
                    name="rawPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={formData.rawPassword || ""}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword || ""}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="mt-2 h-10 w-full cursor-pointer rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors
                             hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Submitting..." : "Create account"}
                </button>
            </form>
        </AuthCard>
    );
}

export default Register;