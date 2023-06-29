import { WebInfo } from "@/types/interfaces";


async function fetchWebInfo() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/setting/webInfo");
    const data = await res.json();
    return data as WebInfo;
}


export { fetchWebInfo }