import { useEffect, useState } from "react";
import DataContext from "./data-context";
import _ from "lodash";
import { countryApiUrl } from "../data/configs";
import { CustomerRowData, DocumentRowData } from "../types/TableInfo";
import { baseApiUrl } from '../data/configs';

type Props = {
    children: any
}

const DataProvider = (props: Props) => {
    const [countries, setCountries] = useState<string[]>([]);
    const [customers, setCustomers] = useState<CustomerRowData[]>([]);
    const [customerDocuments, setCustomerDocuments] = useState<DocumentRowData[]>([]);

    useEffect(() => {
        //Load country list for the first time only.
        if (countries.length === 0) {
            fetch(countryApiUrl)
                .then((res) => {
                    return res.json();
                })
                .then((data: any) => {
                    const groupedData = _.groupBy(data, 'country');
                    const _countries = Object.keys(groupedData).sort().map(value => {
                        return { label: value, value };
                    });
                    setCountries(_countries);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [countries]);

    useEffect(() => {
        if (customers.length === 0) {
            const url = `${baseApiUrl}/api/customers`;
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data: DataRow[]) => {
                    setCustomers(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    const { children } = props;
    const dataValue = {
        countries,
        setCountries,
        customers,
        setCustomers,
        customerDocuments,
        setCustomerDocuments,
    }
    return (
        <DataContext.Provider value={dataValue}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;