import { useRef, useState, useEffect } from 'react';
import { Document } from '../types/Document';
import { Paper } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { binaryToBytesArray, byteToUint8Array, arrayBufferToBase64, getExt } from '../utils/helper';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './DocumentViewer.css';
export interface Props {
    open: boolean;
    selectedDoc: Record;
    onClose: (value: string) => void;
}


export default function DocumentViewer(props: Props) {
    const { onClose, selectedDoc, open } = props;
    const ext = getExt(selectedDoc?.name);
    const handleDialogClose = () => {
        onClose(selectedDoc);
    };

    const dialogCls = ext === 'pdf' ? 'pdf-viewer' : '';

    return (
        <Dialog className={dialogCls} onCalose={handleDialogClose} open={open} sx={{ background: 'transparent' }}>
            <CloseOutlinedIcon onClick={handleDialogClose} className='dialog-close' />
            {(() => {
                if (open && selectedDoc) {
                    const byteArray = binaryToBytesArray(selectedDoc.data);
                    switch (ext) {
                        case 'png':
                        case 'jpg':
                        case 'jpeg':
                        case 'bmp':
                        case 'gif': {
                            const base64 = arrayBufferToBase64(byteArray);
                            return <img
                                style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }}
                                src={'data:image/png;base64,' + base64}
                                alt="image"
                            />
                        }
                        case 'pdf': {
                            const blob = new Blob([new Uint8Array(byteArray).buffer], { type: 'application/pdf' });
                            const objectURL = URL.createObjectURL(blob);
                            const iframeStyle = {
                                height: '100%',
                                width: '100%',
                                position: 'absolute',
                            }
                            return <iframe style={iframeStyle} src={objectURL} />
                        }
                        default: {
                            return <Paper sx={{ p: 5, fontSize: 25 }}>Preview of this file type not supported yet.</Paper>
                        }
                    }
                }
            })()}
        </Dialog>
    );
}