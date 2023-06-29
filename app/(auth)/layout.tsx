import AuthLayout from "@/components/@auth/Layout";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// dynamic metadata
export async function generateMetadata() {
  const title = "احراز هویت";
  return {
    title: {
      default: title,
      template: title + " | %s",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/");

  return (
    <AuthLayout>
      {children}
      {/*  */}
    </AuthLayout>
  );
}
