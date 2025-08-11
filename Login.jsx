import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);   
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  }

  return (
    <div className="container">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} />
        {error && <p className="error">{error}</p>}
        <button>Log in</button>
      </form>
      <p className="small">New here? <Link to="/signup">Create an account</Link></p>
    </div>
  );

}
