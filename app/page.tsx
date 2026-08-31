import { headers } from "next/headers";
import SignInScreen from "@/components/SignInScreen";
import Homepage from "@/components/Homepage";

export default async function Page() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("x-user-email");

  if (!email) {
    return <SignInScreen />;
  }

  return (
    <Homepage
      name={requestHeaders.get("x-user-name") || "You"}
      image={requestHeaders.get("x-user-avatar")}
    />
  );
}
