import { useLogin } from "../../hooks/useLogin";

function LoginPage() {
    const {
        formData,
        handleSubmit,
        handleChange,
        error,
        loading
    } = useLogin();

    return (
        <div className = "flex-1 flex flex-col justify-center items-center">
            <div className="shadow-sm p-2 w-150 rounded-sm">    
                <div className="text-red-500 font-semibold"> {error ? error : ""}</div>
                <h6 className="text-center">Welcome User</h6>
                <div >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password || ""}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
                    
            </div>
            
        </div>
    );
}

export default LoginPage;