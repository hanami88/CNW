import { Navigate } from "react-router-dom";
import Nav from "../components/Nav";
export default function HomePage({ user }: { user: any }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Nav />
      <div>{user.TenTV}</div>
    </>
  );
}
