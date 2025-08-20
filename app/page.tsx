import { SignIn, SignUp } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      hi there
      <SignIn/>
      <SignUp/>
    </div>
  );
}
