import { Button, Stack, TextField } from "@mui/material";
import UploadControl from "./UploadControl";
import { Controller, useForm } from "react-hook-form";
import { Document, emptyDocument } from "../types/Document";
import { baseApiUrl } from '../data/configs';
import { useState, useContext } from "react";
import DataContext from '../context/data-context';
import axios from 'axios';
import { byteToBinary } from '../utils/helper';

type Props = {
    data: Document,
    onSubmitEnd: () => void
}

const AddEditDocument = (props: Props) => {
    const { data, onSubmitEnd } = props;
    const [document, setDocument] = useState(data || emptyDocument);
    const { customerDocuments, setCustomerDocuments } = useContext(DataContext);
    const { control, handleSubmit, formState, trigger, setValue } = useForm({
        defaultValues: document,
        mode: "onChange",
    });

    const [file, setFile] = useState<Blob>();
    const onDocumentSubmit = async (data: Document) => {
        const reader = new FileReader();
        reader.onloadend = function (e) {
            const byteArray = new Uint8Array(e.target.result);
            const binary = byteToBinary(byteArray);
            const formData = new FormData();
            formData.append('name', file.name);
            formData.append('type', data.type);
            formData.append('data', binary);
            formData.append('customerId', data.customerId);

            axios.post(`${baseApiUrl}/api/documents`, formData,
                {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                })
                .then(response => {
                    if (response?.data) {
                        if (data.id) {
                            let docs = [...customerDocuments];
                            docs = docs.map(c => {
                                if (c.id === data.id) {
                                    Object.assign(c, data);
                                }
                                return c;
                            });
                            setCustomerDocuments(docs);
                        } else {
                            setCustomerDocuments([...customerDocuments, response.data]);
                        }
                    }
                    onSubmitEnd();
                })
                .catch(error => {
                    console.error(error);
                });
        };
        reader.readAsArrayBuffer(file);

    };

    const setSelectedFile = (file: any) => {
        setValue('name', file.name)
        trigger('name');
        setFile(file);
    }

    const fieldRequired = {
        required: true,
    }

    return (
        <form onSubmit={handleSubmit(onDocumentSubmit)}>
            <Stack direction="column" sx={{ m: '10px 15px' }} spacing={2}>
                <Controller
                    name="name"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <UploadControl onSelectFile={setSelectedFile} field={field}></UploadControl>}
                />
                <Controller
                    name="type"
                    control={control}
                    rules={fieldRequired}
                    render={({ field }) => <TextField label="Type" variant="standard" {...field} />}
                />

                <Button type="submit" variant="contained" size="small" sx={{ mt: '15px' }} disabled={!formState.isValid}>Submit</Button>
            </Stack>
        </form>
    );
}

export default AddEditDocument;