
export type LoginFormData = {
    username: string;
    password: string;
};


export type LoginPhoneOtpFormData = {
    phone: string;
    token: string;
};


export type SubscriptionFormData = {
    email: string;
};

// user info

export type UserInfoFormData = {
    firstName: string;
    lastName: string;
    status: string;
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