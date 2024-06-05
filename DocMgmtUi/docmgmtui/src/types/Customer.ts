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
    firstName: 'Cust',
    lastName: 'ddf',
    email: 'dd@dd.com',
    address: 'dfdf',
    city: 'dfdf',
    state: 'dfd',
    postalCode: 'dfdf',
    country: 'Algeria',
    phone: 'ddd',
    gender: 'Female',
}