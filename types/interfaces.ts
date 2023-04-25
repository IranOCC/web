export enum UserRoleEnum {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    Agent = 'Agent',
    Author = 'Author',
    User = 'User',
}

export enum UserStatusEum {
    Active = 'Active',
    NotActive = 'NotActive',
    Delete = 'Delete',
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
    id: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    fullName: string | null | undefined;
    emailAddress: string | null | undefined;
    email: Email | string | null | undefined;
    phoneNumber: string | null | undefined;
    phone: Phone | string | null | undefined;
    avatar: string | null | undefined;
    roles: UserRoleEnum[];
    status: UserStatusEum
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