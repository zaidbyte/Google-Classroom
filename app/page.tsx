import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isWhitelisted } from "@/lib/whitelist";
import SignInScreen from "@/components/SignInScreen";
import Homepage from "@/components/Homepage";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return <SignInScreen />;
  }

  if (!isWhitelisted(session.user.email)) {
    redirect("https://classroom.google.com");
  }

  return (
    <Homepage
      name={session.user.name ?? "You"}
      image={session.user.image}
    />
  );
}
