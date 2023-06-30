import PanelLayout from "@/components/@panel/Layout";

// dynamic metadata
export async function generateMetadata() {
  const title = "پنل مدیریت";
  return {
    title: {
      default: title,
      template: title + " | %s",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelLayout>
      {children}
      {/*  */}
    </PanelLayout>
  );
}
