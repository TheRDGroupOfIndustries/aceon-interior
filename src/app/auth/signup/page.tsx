import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignupForm from "@/components/SignupForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return <SignupForm />;
}
