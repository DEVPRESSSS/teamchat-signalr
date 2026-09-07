import { useRegister } from "../../hooks/useRegister";

function Register() {
    const { formData, error, loading,
        handleChange, handleSubmit } = useRegister();

  return (
      <div className="flex-1 flex flex-col justify-center items-center">
          <div className="shadow-sm p-2 w-150 rounded-sm">
              <div className="text-red-500 font-semibold"> {error ? error : ""}</div>
              <h6 className="text-center">Register here</h6>
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
                          name="rawPassword"
                          placeholder="Password"
                          value={formData.rawPassword || ""}
                          onChange={handleChange}
                          required
                      />
                      <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword || ""}
                          onChange={handleChange}
                          required
                      />
                      <button type="submit" disabled={loading}>
                          {loading ? "Submitting..." : "Submit"}
                      </button>
                  </form>
              </div>

          </div>
      </div>
  );
}

export default Register;