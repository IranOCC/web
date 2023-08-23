import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WebBlogPost, WebEstate, WebInfo, WebOffice, WebPage, } from "@/types/interfaces";
import { getServerSession } from "next-auth";


export async function fetchWebInfo() {
    const session = await getServerSession(authOptions);
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/setting/webInfo", { headers: { "Authorization": `Bearer ${session?.accessToken}` } });
    const data = await res.json();
    return data as WebInfo;
}



export async function fetchBlogList(s?: URLSearchParams) {
    const session = await getServerSession(authOptions);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/post?size=10&current=1${!!s ? "&" + s.toString() : ""}`, { headers: { "Authorization": `Bearer ${session?.accessToken}` }, next: { revalidate: 1 } });
    const data = await res.json();
    return data as { items: WebBlogPost[]; total: number };
}


export async function fetchEstateList(s?: URLSearchParams) {
    const session = await getServerSession(authOptions);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/estate?size=10&current=1${!!s ? "&" + s.toString() : ""}`, { headers: { "Authorization": `Bearer ${session?.accessToken}` }, next: { revalidate: 1 } });
    const data = await res.json();
    return data as { items: WebEstate[]; total: number };
}


export async function fetchOfficeList() {
    const session = await getServerSession(authOptions);
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/office?size=20&current=1", { headers: { "Authorization": `Bearer ${session?.accessToken}` }, next: { revalidate: 500 } });
    const data = await res.json();
    return data as { items: WebOffice[]; total: number };
}




export async function fetchSingleEstate(id_or_slug: string) {
    const session = await getServerSession(authOptions);
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/estate/" + id_or_slug, { headers: { "Authorization": `Bearer ${session?.accessToken}` }, next: { revalidate: 1 } });
    try {
        const data = await res.json();
        return data as WebEstate;
    } catch (error) {
        return undefined
    }
}

export async function fetchSingleBlogPost(id_or_slug: string) {
    const session = await getServerSession(authOptions);
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/blog/post/" + id_or_slug, { headers: { "Authorization": `Bearer ${session?.accessToken}` }, next: { revalidate: 1 } });
    try {
        const data = await res.json();
        return data as WebBlogPost;
    } catch (error) {
        return undefined
    }
}

export async function fetchSinglePage(id_or_slug: string) {
    const session = await getServerSession(authOptions);
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/page/" + id_or_slug, { headers: { "Authorization": `Bearer ${session?.accessToken}` }, next: { revalidate: 1 } });
    try {
        const data = await res.json();
        return data as WebPage;
    } catch (error) {
        return undefined
    }
}
