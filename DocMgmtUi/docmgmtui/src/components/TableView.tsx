
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { PagingToolbar } from './PagingToolbar';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Popover } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { DataRow, customerDisplayFields, documentDisplayFields, FieldType } from '../types/TableInfo';
import { useContext, useState, useEffect } from 'react';
import DataContext from '../context/data-context';
import AddEditEntity from './AddEditCustomer';
import { useConfirm } from "material-ui-confirm";
import _ from 'lodash';
import axios from 'axios';
import { format } from 'date-fns';
import { baseApiUrl } from '../data/configs';
import { useNavigate } from 'react-router-dom';
import { binaryToBytesArray, getExt } from '../utils/helper';
import { docTypes } from '../data/doc-types';
import DocumentViewer from './DocumentViewer';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type Props = {
    tableType: string,
}


const TableView = (props: Props) => {
    const { tableType } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { customers, setCustomers, customerDocuments, setCustomerDocuments } = useContext(DataContext);
    const [tableData, setTableData] = useState([]);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [editRecord, setEditRecord] = useState<Record>(null as Record);
    const [displayFields] = useState<FieldType[]>(tableType === 'document' ? documentDisplayFields : customerDisplayFields);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(undefined);

    const confirm = useConfirm();
    const navigate = useNavigate();

    useEffect(() => {
        setTableData(tableType === 'customer' ? customers : customerDocuments);
    }, [tableType, customers, customerDocuments]);

    // To avoid a layout breaking for empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const popupEditCustomer = (ev: React.MouseEvent<HTMLButtonElement>, row: Record) => {
        console.log(row.lastName)
        setEditRecord(row);
        setAnchorEl(ev.currentTarget);
        setOpen(true);
        setId('edit-customer-' + row.id);
    }

    const handlePopoverClose = () => {
        setOpen(false);
        setId(undefined);
        setEditRecord(null);
        setAnchorEl(null);
    };

    const drillDownCustomer = (row: Record) => {
        navigate(`/customer/${row.id}`);
    }

    const deleteEntity = (row: Record) => {
        confirm({
            title: "Are you sure you want to delete?",
            description: 'For your information, the data will be fully lost.',
            confirmationText: 'Yes',
        })
            .then(() => {
                const url = `${baseApiUrl}/api/${tableType}s/${row.id}`;
                axios.delete(url)
                    .then(() => {
                        const rows = tableData.filter(c => c.id !== row.id);
                        if (tableType === 'customer') {
                            setCustomers(rows);
                        } else {
                            setCustomerDocuments(rows);
                        }
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const downloadDocument = (row: Record) => {
        const ext = getExt(row.name);
        const matchedType = docTypes.find(item => item[ext]);
        if (matchedType) {
            const contentType = matchedType[ext];
            const byteArray = binaryToBytesArray(row.data);
            const bytes = new Uint8Array(byteArray);
            const blob = new Blob([bytes], { type: contentType });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = row.name;
            link.click();
        }
    }



    // For view panel
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedViewDoc, setSelectedViewDoc] = useState<Record>(null);

    const handleViewerClose = (value: string) => {
        setViewerOpen(false);
    };

    const viewDocument = (row: Record) => {
        setViewerOpen(true);
        setSelectedViewDoc(row);
    }



    const actionIconStyle = { ml: 1, fontSize: 18 };

    return <Table aria-label="search page">
        <TableHead>
            <TableRow>
                {displayFields.map((field, index) => (
                    <StyledTableCell align="left" key={field.name + "-" + index}>{field.label}</StyledTableCell>
                ))}
                <StyledTableCell align="center"></StyledTableCell>

            </TableRow>
        </TableHead>
        <TableBody>
            {(rowsPerPage > 0
                ? tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : tableData
            ).map((row: Record<string, string>) => (
                <StyledTableRow key={row.id}>
                    {displayFields.map((field: FieldType) => (
                        <StyledTableCell component="th" scope="row" key={field.name + "-" + row.id}>
                            {field.name === 'dateCreated' && format(row[field.name], 'MMMM do yyyy, h:mm:ss a')}
                            {field.name !== 'dateCreated' && row[field.name]}
                        </StyledTableCell>
                    ))}
                    <StyledTableCell>
                        {tableType === 'customer' &&
                            <>
                                <Tooltip title="Edit"><EditIcon onClick={(ev) => popupEditCustomer(ev, row)} sx={actionIconStyle}></EditIcon></Tooltip>
                                <Tooltip title="Drill Down"><UnfoldMoreIcon onClick={() => drillDownCustomer(row)} sx={actionIconStyle}></UnfoldMoreIcon></Tooltip>
                            </>
                        }
                        {tableType === 'document' &&
                            <>
                                <Tooltip title="Download"><DownloadForOfflineOutlinedIcon onClick={() => downloadDocument(row)} sx={actionIconStyle}></DownloadForOfflineOutlinedIcon></Tooltip>
                                <Tooltip title="View"><PreviewOutlinedIcon onClick={() => viewDocument(row)} sx={actionIconStyle}></PreviewOutlinedIcon></Tooltip>
                            </>
                        }
                        <Tooltip title="Delete"><RemoveCircleOutlineIcon onClick={() => deleteEntity(row)} sx={actionIconStyle}></RemoveCircleOutlineIcon></Tooltip>
                    </StyledTableCell>
                </StyledTableRow>
            ))}

            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={3} />
                </TableRow>
            )}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                    colSpan={displayFields.length + 1}
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                        select: {
                            inputProps: {
                                'aria-label': 'Rows per page',
                            },
                            native: true,
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={PagingToolbar}
                />
            </TableRow>
        </TableFooter>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            {editRecord && <AddEditEntity data={editRecord} onSubmitEnd={handlePopoverClose}></AddEditEntity>}
        </Popover>

        <DocumentViewer
            selectedDoc={selectedViewDoc}
            open={viewerOpen}
            onClose={handleViewerClose}
        />
    </Table>;
}

export default TableView;