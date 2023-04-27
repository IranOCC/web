import { Email, Phone, User, UserRoleEnum, UserStatusEum, StorageFile } from "./interfaces";

export type LoginPhoneOtpFormData = {
    phone: string;
    token: string;
};


export type SubscriptionFormData = {
    email: string;
};

// user info

export type UserFormData = {
    firstName: string;
    lastName: string;
    status: UserStatusEum;
    roles: UserRoleEnum[];
    // 
    phoneNumber: string;
    emailAddress: string;
    // 
    province: string;
    city: string;
    address: string;
};



export type OfficeFormData = {
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
    location?: [number, number]
    // 
    verified?: boolean;
    active?: boolean;
};



export type UserPhoneFormData = {
    phoneNumber: string;
    token: string;
};

export type UserEmailFormData = {
    phoneNumber: string;
    token: string;
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