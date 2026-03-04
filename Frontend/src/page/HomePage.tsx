import Nav from "../components/Nav";
export default function HomePage({ user }: { user: any }) {
  console.log(user);
  return (
    <>
      <Nav />
      <div>{user.TenTV}</div>
    </>
  );
}
