import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="page">
      <h1 className="title">404</h1>
      <p>This page doesn’t exist. <Link className="link" to="/">Go home</Link></p>
    </div>
  );
}
