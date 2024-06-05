
export type CustomerRowData = {
    id: string;
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    phone: string,
    gender: string,
    dateCreated?: Date,
}

export type DocumentRowData = {
    id: string;
    name: string,
    type: string,
    dateCreated?: Date,
}

export type FieldType = {
  name: string,
  label: string,
}

export const customerDisplayFields: FieldType[] = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email' },
    { name: 'city', label: 'City' },
    { name: 'phone', label: 'Phone' },
    { name: 'gender', label: 'Gender' },
    { name: 'dateCreated', label: 'Date Created' },
]

export const documentDisplayFields: FieldType[] = [
    { name: 'name', label: 'Name' },
    { name: 'type', label: 'Type' },
    { name: 'dateCreated', label: 'Date Created' },
]
