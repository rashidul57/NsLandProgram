import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useContext } from 'react';
import { DataRow } from '../types/TableInfo';
import _ from 'lodash';
import CustomSelect from './CustomSelect';
import { baseApiUrl } from '../data/configs';
import { Button, Link, Popover, Stack, TextField, Typography } from '@mui/material';
import DataContext from '../context/data-context';
import TableView from './TableView';
import InjectUid from '../utils/helper';
import AddEditEntity from './AddEditCustomer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { emptyDocument } from '../types/Document';
import AddEditDocument from './AddEditDocument';
import { Style } from '@mui/icons-material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';


const CustomerDetails = () => {
    //const [tableData, setTableData] = useState([] as DataRow[]);
    const navigate = useNavigate();
    const [newDocument, setNewDocument] = useState({...emptyDocument});
    // const [documents, setDocuments] = useState<Document[]>([]);
    const { customers, customerDocuments, setCustomerDocuments } = useContext(DataContext);
    const words = location.pathname.split('/');
    const [customerId, setCustomerId] = useState(words?.length ? words[2] : undefined);
    const selectedCustomer = customers.find(c => c.id === customerId);
    //debugger;
    if (selectedCustomer?.id && !newDocument.customerId) {
        setNewDocument({ ...newDocument, customerId: selectedCustomer.id })
    }

    useEffect(() => {
        if (customerId) {
            const url = `${baseApiUrl}/api/documents/customerdocuments/${customerId}`;
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data: DataRow[]) => {
                    setCustomerDocuments(data);
                });
        }
    }, [customerId]);



    const [docAnchorEl, setDocAnchorEl] = useState<HTMLButtonElement | null>(null);

    const addDocument = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setDocAnchorEl(ev.currentTarget);
    };

    const handlePopoverClose = () => {
        setDocAnchorEl(null);
    };

    const gotoDashboard = () => {
        navigate(`/`);
    }

    const custPopoverOpen = Boolean(docAnchorEl);
    const id = custPopoverOpen ? 'add-document-popover' : undefined;

    return (
        <TableContainer component={Paper} elevation={0} sx={{ p: { xs: '5px', md: '10px 50px 0px 50px' }, width: 'auto' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Documents of: {selectedCustomer?.firstName} {selectedCustomer?.lastName}</Typography>
            <Typography>Case Number: {selectedCustomer?.id}</Typography>
            <Typography>{selectedCustomer?.address}, {selectedCustomer?.city}, {selectedCustomer?.country}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ mt: { xs: 1, md: 1 }, ml: { xs: 1 } }}>
                <Button onClick={gotoDashboard} size="small" startIcon={<ArrowBackOutlinedIcon />} style={{ textTransform: 'none' }}>Back</Button>
                <Typography sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'none', md: 'inline-block' } }}>&nbsp;</Typography>

                <Button onClick={addDocument} size="small" startIcon={<AddCircleOutlineIcon />} style={{ textTransform: 'none' }}>Document</Button>
                <Popover
                    id={id}
                    open={custPopoverOpen}
                    anchorEl={docAnchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <AddEditDocument data={newDocument} onSubmitEnd={handlePopoverClose} ></AddEditDocument>
                </Popover>
            </Stack>

            <TableView tableType='document'></TableView>

        </TableContainer>
    );
}

export default CustomerDetails;
