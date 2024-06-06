

export type Document = {
    id?: string;
    name: string;
    data: string;
    type: string;
    dateCreated: string;
    customerId: string;
}

export const emptyDocument = {
    name: '',
    data: '',
    type: 'Driving License',
    dateCreated: '',
    customerId: '',
}
