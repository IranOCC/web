export enum UserRoleEnum {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    Agent = 'Agent',
    Author = 'Author',
    User = 'User',
}

export enum UserStatusEum {
    Active = 'Active',
    NewUser = 'NewUser',
    NotActive = 'NotActive',
    Delete = 'Delete',
}


export interface User {
    id: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;
    phone: string;
    roles: UserRoleEnum[];
    status: UserStatusEum
}


export interface LoginUser {
    user: User,
    accessToken: string;
}