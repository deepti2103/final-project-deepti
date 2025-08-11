import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function formatDate(d) {
  if (!d) return "—";
  try { return new Date(d).toLocaleString(); } catch { return String(d); }
}

function initialsFrom(name = "", email = "") {
  const base = name || email?.split("@")[0] || "U";
  const parts = base.trim().split(/\s+/).slice(0, 2);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function Profile() {
  const { uid } = useParams();
  const { user, updateDisplayName } = useAuth();

  const isMe = user?.uid === uid;
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const email = user?.email ?? "—";
  const createdAt = user?.metadata?.creationTime;
  const lastSignIn = user?.metadata?.lastSignInTime;

  const initials = useMemo(
    () => initialsFrom(displayName, email),
    [displayName, email]
  );

  const [name, setName] = useState(displayName);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => setName(displayName), [displayName]);

  async function handleSave(e) {
    e.preventDefault();
    const val = name.trim();
    if (val.length < 3) return setMsg("Display name must be at least 3 characters.");
    try {
      setBusy(true);
      await updateDisplayName(val);
      setMsg("Display name updated.");
    } catch (err) {
      setMsg(err?.message || "Could not update name.");
    } finally {
      setBusy(false);
      setTimeout(() => setMsg(""), 1800);
    }
  }

  async function copyUid() {
    try {
      await navigator.clipboard.writeText(uid || "");
      setMsg("UID copied.");
      setTimeout(() => setMsg(""), 1200);
    } catch {
      setMsg("Couldn’t copy UID.");
      setTimeout(() => setMsg(""), 1200);
    }
  }

  return (
    <div className="page">
      <div className="card" style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            aria-label="Avatar"
            style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "var(--accent)", color: "#0b1220",
              display: "grid", placeItems: "center",
              fontWeight: 800, fontSize: 22
            }}
          >
            {initials}
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{isMe ? "Your Profile" : "User Profile"}</h2>
            <div className="small">UID: {uid || "—"}</div>
          </div>
        </div>

        <div className="row" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "grid", gap: 6 }}>
            <div><b>Display name:</b> {displayName}</div>
            <div><b>Email:</b> {email}</div>
            <div><b>Joined:</b> {formatDate(createdAt)}</div>
            <div><b>Last sign-in:</b> {formatDate(lastSignIn)}</div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn" type="button" onClick={copyUid}>Copy UID</button>
            <Link to="/dashboard" className="btn" style={{ textDecoration: "none", display: "inline-grid", placeItems: "center" }}>
              Dashboard
            </Link>
          </div>
        </div>

        {isMe && (
          <form onSubmit={handleSave} className="col" style={{ marginTop: 8 }}>
            <label className="label" htmlFor="displayName">Edit display name</label>
            <input
              id="displayName"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <button className="btn" disabled={busy} style={{ width: "fit-content" }}>
              {busy ? "Saving…" : "Save"}
            </button>
          </form>
        )}

        {msg && <p className="small" style={{ marginTop: 4 }}>{msg}</p>}
      </div>
    </div>
  );
}
