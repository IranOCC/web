import { WebBlogPost, WebEstate, WebInfo, } from "@/types/interfaces";


export async function fetchWebInfo() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/setting/webInfo");
    const data = await res.json();
    return data as WebInfo;
}


export async function fetchSingleBlogPost(id_or_slug: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/blog/post/" + id_or_slug, { next: { revalidate: 10 } });
    const data = await res.json();
    return data as WebBlogPost;
}



export async function fetchSingleEstate(id_or_slug: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/estate/" + id_or_slug, { next: { revalidate: 10 } });
    const data = await res.json();
    return data as WebEstate;
}


export async function fetchSinglePage(id_or_slug: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/page/" + id_or_slug, { next: { revalidate: 10 } });
    const data = await res.json();
    return data as WebEstate;
}
