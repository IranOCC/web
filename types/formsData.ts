
export type LoginFormData = {
    username: string;
    password: string;
};


export type PhoneOtpFormData = {
    phone: string;
};

export type LoginByOtpFormData = {
    phone: string;
    token: string;
};