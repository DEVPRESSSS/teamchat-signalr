import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import AuthCard from "../../components/AuthCard";
import FormField from "../../components/FormField";

function LoginPage() {
    const {
        formData,
        handleSubmit,
        handleChange,
        error,
        loading
    } = useLogin();

    return (
        <AuthCard
            title="Welcome back"
            subtitle="Log in to pick up your conversations."
            error={error}
            footer={
                <>
                    New to TeamChat?{" "}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Create an account
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="mt-2 h-10 w-full rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors
                               hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </AuthCard>
    );
}

export default LoginPage;