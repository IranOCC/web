import { Email, Phone, User, StorageFile, Office, Icon, EstateCategory } from "./interfaces";

export type LoginPhoneOtpFormData = {
    phone: string;
    token: string;
};


export type SubscriptionFormData = {
    email: string;
};

// user info

export type UserFormData = {
    _id?: string;

    firstName: string;
    lastName: string;
    roles: string[];
    avatar?: StorageFile | string;
    // 
    phone?: Phone | string;
    email?: Email | string;
    // 
    province?: string;
    city?: string;
    address?: string;
    location?: [number, number] | string;
    // 
    verified?: boolean;
    active?: boolean;
};






export type SendSmsBoxFormData = {
    text: string;
    phoneNumber?: string;
    phoneID?: string;
    officeID?: string;
    userID?: string;
};

export type SendEmailBoxFormData = {
    text: string;
    emailAddress?: string;
    emailID?: string;
    officeID?: string;
    userID?: string;
};



// =============


export type OfficeFormData = {
    _id?: string;

    name: string;
    description?: string;
    management: User | string;
    logo?: StorageFile | string;
    // 
    phone?: Phone | string;
    email?: Email | string;
    // 
    province?: string;
    city?: string;
    address?: string;
    location?: [number, number] | string;
    // 
    verified?: boolean;
    active?: boolean;
};

export type OfficeAddMemberFormData = {
    members: string[];
};


export type IconFormData = {
    _id: string;

    name: string;
    content: string;
};

// ============== estate

export type EstateFormData = {
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


export type EstateCategoryFormData = {
    _id?: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    parent: EstateCategory | string;
}

export type EstateDocumentTypeFormData = {
    _id?: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    categories: EstateCategory[] | string[];
}

export type EstateFeatureFormData = {
    _id?: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    categories: EstateCategory[] | string[];
}

export type EstateTypeFormData = {
    _id?: string;

    title: string;
    slug: string;
    description: string;
    icon: Icon | string;
    tags: string[];
    categories: EstateCategory[] | string[];
}

// =============






export type InitialSettingsFormData = {
    title: string;
    description: string;
    keywords: string[];
};