import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { Button, Link, Popover, Stack, TextField, Typography } from '@mui/material';
import TableView from './TableView';
import AddEditCustomer from './AddEditCustomer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CustomerDashboard = () => {

    const [customerAnchorEl, setCustomerAnchorEl] = useState<HTMLButtonElement | null>(null);

    const addCustomer = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setCustomerAnchorEl(ev.currentTarget);
    };

    const handlePopoverClose = () => {
        setCustomerAnchorEl(null);
    };

    const open = Boolean(customerAnchorEl);
    const id = open ? 'add-customer-popover' : undefined;

    return (
        <TableContainer component={Paper} elevation={0} sx={{ p: { xs: '5px', md: '10px 50px 0px 50px' }, width: 'auto' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 29 }}>Dashboard</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ mt: { xs: 1, md: 1 }, ml: { xs: 1 } }}>
                
                <Typography sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'none', md: 'inline-block' } }}>&nbsp;</Typography>

                <Button onClick={addCustomer} size="small" startIcon={<AddCircleOutlineIcon />} style={{ textTransform: 'none' }}>Customer</Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={customerAnchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <AddEditCustomer onSubmitEnd={handlePopoverClose}></AddEditCustomer>
                </Popover>
            </Stack>

            <TableView tableType='customer'></TableView>

        </TableContainer>
    );
}

export default CustomerDashboard;
