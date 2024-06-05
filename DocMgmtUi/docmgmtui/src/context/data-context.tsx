import { useState, createContext } from "react";
import { CustomerRowData } from "../types/TableInfo";

const DataContext = createContext({
    countries: [] as string[],
    setCountries: (_data: string[]) => { },
    customers: [] as CustomerRowData[],
    setCustomers: (_data: CustomerRowData[]) => { },
    customerDocuments: [] as DocumentRowData[],
    setCustomerDocuments: (_data: DocumentRowData[]) => { },
});

export default DataContext;