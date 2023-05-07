export enum UserRoleEnum {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    Agent = 'Agent',
    Author = 'Author',
    User = 'User',
}


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

    roles: UserRoleEnum[];

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