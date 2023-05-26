import { ReactElement } from "react";

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    dob?: string,
    phone?: number,
    profile: string,
    address: string,
    created_at: Date,
    updated_at: Date,
};

export type Users = {
    data: any,
    total: UserTotal
};

export type UserTotal = number;