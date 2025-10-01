import { currentUser } from "@/actions/auth";
import UserButton from "@/components/auth/user-button";

export default async function Home() {

  const user = await currentUser();

  return (
    <div>
      <h1 className="text-center text-2xl ">Home page</h1>
      <UserButton user={user}/>
    </div>
  );
}
