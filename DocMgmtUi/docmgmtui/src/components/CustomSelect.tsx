import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

type Props = {
    data: string[],
    selectedValue: string | undefined,
    label: string,
    variant?: undefined,
    field: any,
    onSelectChange: (value: string) => void
}

const CustomSelect = (props: Props) => {
    const { data = [], selectedValue, label, onSelectChange, field } = props;
    const [focused, setFocused] = useState(selectedValue ? true : false);

    const handleChange = (ev: SelectChangeEvent) => {
        onSelectChange(ev.target.value);
    };

    return (
        <div>
            <FormControl sx={{
                mt: { xs: 1, sm: 0, md: '0px' },
                width: { xs: 'calc(100% - 10px)' },
                minWidth: { sm: '200px', md: '200px' }
            }} size="small">
                <InputLabel id="select-autowidth-label" sx={{ transform: focused ? 'translate(0px, -10px) scale(.75)' : 'translate(0px, 17px)' }}>{label}</InputLabel>
                <Select
                    labelId="simple-select-autowidth-label"
                    id="simple-select-autowidth"
                    value={selectedValue}
                    onChange={handleChange}
                    autoWidth
                    label={label}
                    variant={props.variant || 'standard'}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...field}
                >
                    {data.map(item => (
                        <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default CustomSelect;