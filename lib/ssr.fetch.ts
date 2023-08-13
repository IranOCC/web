import { WebBlogPost, WebEstate, WebInfo, WebOffice, WebPage, } from "@/types/interfaces";


export async function fetchWebInfo() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/setting/webInfo");
    const data = await res.json();
    return data as WebInfo;
}



export async function fetchBlogList(s?: URLSearchParams) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/post?size=10&current=1${!!s ? "&" + s.toString() : ""}`, { next: { revalidate: 5 } });
    const data = await res.json();
    return data as { items: WebBlogPost[]; total: number };
}


export async function fetchEstateList(s?: URLSearchParams) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/estate?size=10&current=1${!!s ? "&" + s.toString() : ""}`, { next: { revalidate: 5 } });
    const data = await res.json();
    return data as { items: WebEstate[]; total: number };
}


export async function fetchOfficeList() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/office?size=20&current=1", { next: { revalidate: 500 } });
    const data = await res.json();
    return data as { items: WebOffice[]; total: number };
}




export async function fetchSingleEstate(id_or_slug: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/estate/" + id_or_slug, { next: { revalidate: 10 } });
    try {
        const data = await res.json();
        return data as WebEstate;
    } catch (error) {
        return undefined
    }
}

export async function fetchSingleBlogPost(id_or_slug: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/blog/post/" + id_or_slug, { next: { revalidate: 10 } });
    try {
        const data = await res.json();
        return data as WebBlogPost;
    } catch (error) {
        return undefined
    }
}

export async function fetchSinglePage(id_or_slug: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/page/" + id_or_slug, { next: { revalidate: 10 } });
    try {
        const data = await res.json();
        return data as WebPage;
    } catch (error) {
        return undefined
    }
}
