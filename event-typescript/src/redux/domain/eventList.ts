import { ReactElement } from "react";

export interface Event {
    id: number,
    event_name: string,
    description: string,
    status: string,
    approvedBy?: number,
    image?: string,
    from_date: Date,
    to_date: Date,
    from_time: Date,
    to_time: Date,
    address: string,
    createdAt: Date,
    updatedAt: Date
};

export type Events = {
    data: any,
    total: EventTotal
};

export type EventTotal = number;