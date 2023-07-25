import SingleEstate from "@/components/@web/Features/Estate/SingleEstate";
import { fetchSingleEstate } from "@/lib/ssr.fetch";

export default async function Page({ params }: any) {
  const data = await fetchSingleEstate(params.slug);
  return <SingleEstate data={data} />;
}
