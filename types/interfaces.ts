


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

    roles: string[];

    active: boolean;
    verified: boolean;
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
    documentType?: string[];
    area?: number;
    price?: number;
    totalPrice?: number;
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
    features?: string[];

    province?: string;
    city?: string;
    district?: string;
    quarter?: string;
    alley?: string;
    address?: string;
    location?: [number, number] | string;

    owner?: User | string;
    createdBy?: User | string;
    confirmedBy?: User | string;
    office?: Office | string;
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