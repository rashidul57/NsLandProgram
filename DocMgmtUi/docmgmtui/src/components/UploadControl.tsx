import { Button, TextField, } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Document } from '../types/Document';

type UploadProps = {
    field: any,
    onSelectFile: (value: string) => void
}

export default function UploadControl(props: UploadProps) {
    const { onSelectFile, field } = props;
    const inputStyle = { display: 'none' };

    const onFileSelect = (ev: any) => {
        const file = ev.target.files[0];
        onSelectFile(file);
    };

    return (
        <div>
            <input
                accept="image/*, application/pdf"
                style={inputStyle}
                id="upload-button-file"
                type="file"
                onChange={e => onFileSelect(e)}
            />
            <TextField variant="standard" inputProps={{ readOnly: true }} style={{ color: 'grey' }} {...field} />
            <label htmlFor="upload-button-file">
                <Button color="primary" component="span" style={{ textTransform: "none" }}>
                    Browse
                </Button>
            </label>
        </div>
    );
}