import { useLogin } from "../../hooks/useLogin";

function LoginPage() {
    const {
        formData,
        handleSubmit,
        handleChange,
        error
    } = useLogin();

    return (
        <div className = "flex-1 flex flex-col justify-center items-center">
            <div className="text-red-500 font-semibold"> {error ? error : ""}</div>
            <div className="shadow-sm p-2 w-150 rounded-sm">    
                <div >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
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
                    
            </div>
            
        </div>
    );
}

export default LoginPage;