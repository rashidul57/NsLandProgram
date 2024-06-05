import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { Customer, emptyCustomer } from "../types/Customer";
import { Genders } from "../data/genders";
import DataContext from '../context/data-context';
import CustomSelect from "./CustomSelect";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { baseApiUrl } from "../data/configs";

type Props = {
    data: Customer,
    onSubmitEnd: () => void
}
const AddEditCustomer = (props: Props) => {
    const { countries, customers, setCustomers } = useContext(DataContext);
    const [customer, setCustomer] = useState(props.data || emptyCustomer);

    const handleGenderChange = (value: string) => {
        const curValue = { ...customer };
        curValue.gender = value;
        setCustomer(curValue);
    }

    const handleCountryChange = (value: string) => {
        const curValue = { ...customer };
        curValue.country = value;
        setCustomer(curValue);
    }

    const { control, handleSubmit, formState } = useForm({
        defaultValues: customer,
        mode: "onChange"
    });
    const onCustomerSubmit = (data: Customer) => {
        let url = `${baseApiUrl}/api/customers`;
        const method = data.id ? axios.put : axios.post;
        if (data.id) {
            url += `/${data.id}`;
        }
        method(url, data)
            .then((response) => {
                if (response?.data) {
                    if (data.id) {
                        let newCustomers = [...customers];
                        newCustomers = newCustomers.map(c => {
                            if (c.id === data.id) {
                                Object.assign(c, data);
                            }
                            return c;
                        });
                        setCustomers(newCustomers);
                    } else {
                        setCustomers([...customers, response.data]);
                    }
                }
                props.onSubmitEnd();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const fieldRequired = {
        required: true,
    }

    return (
        <form onSubmit={handleSubmit(onCustomerSubmit)}>
            <Stack direction="column" sx={{ m: '10px 15px' }} spacing={2}>
                <Controller
                    name="firstName"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="First Name" variant="standard" {...field} />}
                />
                <Controller
                    name="lastName"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="Last Name" variant="standard" {...field} />}
                />

                <Controller
                    name="email"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="Email" variant="standard" {...field} />}
                />

                <Controller
                    name="address"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="Address" variant="standard" {...field} />}
                />
                <Controller
                    name="city"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="City" variant="standard" {...field} />}
                />
                <Controller
                    name="state"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="State" variant="standard" {...field} />}
                />
                <Controller
                    name="postalCode"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="Postal Code" variant="standard" {...field} />}
                />

                <Controller
                    name="country"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <CustomSelect data={countries} selectedValue={customer.country} label='Country'
                        onSelectChange={handleCountryChange} field={field}></CustomSelect>}
                />
                <Controller
                    name="phone"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="Phone" variant="standard" {...field} />}
                />

                <Controller
                    name="gender"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <CustomSelect data={Genders} selectedValue={customer.gender} label='Gender'
                        onSelectChange={handleGenderChange} field={field}></CustomSelect>}
                />

                <Button type="submit" variant="contained" size="small" sx={{ mt: '15px' }} disabled={!formState.isValid}>{customer.id ? 'Update' : 'Create'}</Button>
            </Stack>
        </form>
    );
}

export default AddEditCustomer;