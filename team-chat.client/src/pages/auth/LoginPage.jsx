import { useLogin } from "../../hooks/useLogin";

function LoginPage() {
    const {
        formData,
        handleSubmit,
        handleChange,
        error
    } = useLogin();

    return (
        <div>
            <h4>Welcome User</h4>
            <div className="text-red-500 font-semibold"> { error ? error: ""}</div>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder = "Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password || ""}
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;