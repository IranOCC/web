


export interface ObjectID {
    _id: string;
}

export interface Email {
    value: string;
    verified: boolean;
}

export interface Phone {
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
    location?: [number, number, number];

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
    location?: [number, number, number];

    membersCount: number;
    estatesCount: number;
    postsCount: number;

    verified?: boolean;
    active?: boolean;
    // 
    members?: User[] | string[];
}




export interface Estate {
    _id: string;

    title: string;
    content?: string;
    excerpt?: string;
    slug: string;

    image?: StorageFile | string;

    status: string;
    visibility: string;
    password: string;
    pinned: boolean;

    publishedAt: Date;

    tags: string[];
    categories: string[];


    code: string;

    province?: string;
    city?: string;
    district?: string;
    quarter?: string;
    alley?: string;
    address?: string;
    location?: [number, number];

    price: number;
    totalPrice: number;

    description: string;

    gallery?: StorageFile | string;

    canBarter: boolean;

    area: number;
    documentType: string[];
    features: string[];
    constructionYear: number;

    roomsCount: number;
    mastersCount: number;
    buildingArea: number;
    floorsCount: number;
    unitsCount: number;
    floor: number;

    withOldBuilding: boolean;
};



export interface Session {
    user: User,
    accessToken: string;
}



export interface Settings {
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

export interface Tag {
    _id: string;
    name: string;
};


// ===


export interface EstateCategory {
    _id: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: Tag[] | string[];
    parent: EstateCategory | string;
}