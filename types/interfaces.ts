import { UserRoles } from "./enum";



export interface ObjectID {
    _id: string;
}


export type SelectDataType = {
    title: string;
    value: string;
}

export interface Email {
    _id: string;
    value: string;
    verified: boolean;
}

export interface Phone {
    _id: string;
    value: string;
    verified: boolean;
}

export interface User {
    // for session
    id: any;


    _id: string;

    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;

    email?: Email | string | null;
    phone?: Phone | string | null;

    province?: string;
    city?: string;
    address?: string;
    location?: [number, number] | string;

    avatar?: StorageFile | string | null;

    roles: UserRoles[];

    active: boolean;
    verified: boolean;

    nationalCode?: string;
    birthday?: string;
}


export interface OfficeMember extends User {
    isManagement?: boolean;
}


export interface Office {
    _id: string;
    name: string;
    management: User;
    logo?: StorageFile | string;

    phone?: Phone | string | null;
    email?: Email | string | null;

    province?: string;
    city?: string;
    address?: string;
    location?: [number, number] | string;

    membersCount: number;
    estatesCount: number;
    postsCount: number;

    verified?: boolean;
    active?: boolean;
    showPublic?: boolean;
    // 
    members?: User[] | string[];
}




export interface Estate {
    _id?: string;

    title: string;
    content?: string;
    excerpt?: string;
    slug: string;

    image?: StorageFile | string;
    gallery?: StorageFile[] | string[];


    status: string;
    visibility: string;
    pinned: boolean;
    publishedAt: Date;

    tags?: string[];


    code?: string;
    category: string;
    type?: string;
    documentType?: string;
    features?: string[];

    area: number;
    price: number;
    totalPrice: number;

    description?: string;
    canBarter?: boolean;


    constructionYear?: number;
    roomsCount?: number;
    mastersCount?: number;
    buildingArea?: number;
    floorsCount?: number;
    unitsCount?: number;
    floor?: number;
    withOldBuilding?: boolean;


    province?: string;
    city?: string;
    district?: string;
    quarter?: string;
    alley?: string;
    address?: string;
    location?: [number, number] | string;

    owner?: User | string;
    office?: Office | string;

    updatedAt?: Date;
    createdBy?: User | string;
    createdAt?: Date;

    isConfirmed?: boolean;

    confirmedBy?: User | string;
    confirmedAt?: Date;
};



export interface Session {
    user: User,
    accessToken: string;
}



export interface WebInfo {
    title: string;
    description: string;
    keywords: string[];
}


export interface StorageFile {
    _id: string;
    title: string;
    alt: string;
    mimetype: string;
    filesize: number;
    path: string;
    subject: string;
    uploadedBy?: User;
}


export interface Icon {
    _id: string;
    name: string;
    content: string;
};


export interface SmsTemplate {
    _id: string;
    title: string;
    content: string;
    serviceID: string;
    slug: string;
};

export interface MailTemplate {
    _id: string;
    title: string;
    content: string;
    serviceID: string;
    slug: string;
};

// ===


export interface EstateCategory {
    _id: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    parent: EstateCategory | string;
}

export interface EstateDocumentType {
    _id?: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    categories: EstateCategory[] | string[];
}

export interface EstateFeature {
    _id?: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    categories: EstateCategory[] | string[];
}


export interface EstateType {
    _id?: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    categories: EstateCategory[] | string[];
}








// ==== blog

export interface BlogCategory {
    _id: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    parent: BlogCategory | string;
}


export type BlogPost = {
    _id?: string;

    title: string;
    content?: string;
    excerpt?: string;
    slug: string;

    image?: StorageFile | string;

    status: string;
    visibility: string;
    pinned: boolean;
    publishedAt: Date;

    tags?: string[];

    categories: string[];

    author?: User | string;
    office?: Office | string;

    updatedAt?: Date;
    createdBy?: User | string;
    createdAt?: Date;

    isConfirmed?: boolean;

    confirmedBy?: User | string;
    confirmedAt?: Date;
};




export type Page = {
    _id?: string;

    title: string;
    content?: string;
    slug: string;

    status: string;
    publishedAt: Date;

    tags?: string[];

    updatedAt?: Date;
    createdBy?: User | string;
    createdAt?: Date;
};














// ==========================




export type WebBlogPost = {
    _id: string;

    title: string;
    content: string;
    excerpt: string;
    slug: string;

    image: StorageFile;

    pinned: boolean;
    publishedAt: Date;

    tags: string[];
    categories: BlogCategory[];
    author: User;

    office: Office;
    createdBy: User;
};




export type WebEstate = {
    _id: string;

    title: string;
    content?: string;
    excerpt?: string;
    slug: string;

    image: StorageFile;
    gallery?: StorageFile[];



    pinned?: boolean;
    publishedAt?: Date;

    tags?: string[];


    code?: string;
    category: EstateCategory;
    type?: EstateType;
    documentType?: EstateDocumentType;
    features?: EstateFeature[] | null;

    area: number;

    canBarter?: boolean;


    constructionYear?: number;
    roomsCount?: number;
    mastersCount?: number;
    buildingArea?: number;
    floorsCount?: number;
    unitsCount?: number;
    floor?: number;
    withOldBuilding?: boolean;


    province: string;
    city: string;
    district: string;
    location?: [number, number] | string;


    owner?: User;

    office?: Office;
    createdBy?: User;

    isFavorite?: boolean;

    isConfirmed?: boolean;
    isRejected?: boolean;
};




export type WebPage = {
    _id: string;

    title: string;
    content: string;
    slug: string;

    publishedAt: Date;

    tags: string[];
};



export type WebOffice = {
    _id: string;
    name: string;
    management: User;
    logo?: StorageFile;

    phone?: Phone | string | null;
    email?: Email | string | null;

    province?: string;
    city?: string;
    address?: string;
    location?: [number, number] | string;

    verified?: boolean;
}