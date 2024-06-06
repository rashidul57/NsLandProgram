import { ControllerRenderProps } from "react-hook-form";

export type Customer = {
    id?: string,
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    gender: string;
    dateCreated?: Date;
    documents: string[];
};

// export type Gender = ControllerRenderProps<Entity, "gender">

export const emptyCustomer = {
    firstName: 'David',
    lastName: 'Baker',
    email: 'dbaker@gmail.com',
    address: '25 Wall Street',
    city: 'Halifax',
    state: 'NS',
    postalCode: 'B3A 2K9',
    country: 'Canada',
    phone: '9034854844',
    gender: 'Male',
}