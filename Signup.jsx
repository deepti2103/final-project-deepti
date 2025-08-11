
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user || auth.currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      await signUp(form); 
    } catch (err) {
      setError(err.message || "Sign up failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <h1>Create account</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} />
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
      </form>
      <p className="small" style={{ marginTop: 12 }}>
        Already have an account? <Link className="link" to="/login">Log in</Link>
      </p>
    </div>
  );
}
