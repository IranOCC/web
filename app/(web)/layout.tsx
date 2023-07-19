import WebLayout from "@/components/@web/Layout";
import { WebPreviewProvider } from "@/context/webPreview.context";
import { fetchWebInfo } from "@/lib/ssr.fetch";

// dynamic metadata
export async function generateMetadata() {
  const settings = await fetchWebInfo();
  const { title, description, keywords } = settings;
  return {
    title: {
      default: title + " | " + description,
      template: title + " | %s",
    },
    description,
    keywords,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebPreviewProvider initial={{ full: false }}>
        <WebLayout>
          {children}
          {/*  */}
        </WebLayout>
      </WebPreviewProvider>
    </>
  );
}
