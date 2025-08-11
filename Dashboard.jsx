import { useAuth } from "../context/AuthContext";
import WeatherWidget from "../components/WeatherWidget";
import TasksWidget from "../components/TasksWidget";
import SettingsWidget from "../components/SettingsWidget";

export default function Dashboard() {
  const { user } = useAuth();

  let username = "friend";
  const email = user ? user.email : "";
  if (user) {
    if (user.displayName && user.displayName.trim()) {
      username = user.displayName;
    } else if (email) {
      username = email.split("@")[0];
    }
  }

  return (
    <div className="page">
      <h1>Welcome, {username}</h1>
      <p className="small">
        Signed in as <b>{email}</b>
      </p>

      <div className="grid">
        <WeatherWidget />
        <TasksWidget />
        <SettingsWidget />
      </div>
    </div>
  );
}
