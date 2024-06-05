
export const decimalToBinary = (decimal: number) => decimal.toString(2);

export const charToDecimal = (char: string) => parseInt(char, 10);

export const byteToBinary = (bytes: number[], outputType: 'array' | 'string' = 'string') => {
    //bytes - [5, 6]
    let result = '';
    for (let i = 0; i < bytes.length; i++) {
        //convert the byte to binary
        //Binary of 5 - 101, after padding - 00000101
        //Binary of 6 - 110, after padding - 00000110
        const subResult = decimalToBinary(bytes[i]).padStart(8, '0'); // Pad with leading zeros
        result += subResult;
    }
    //result = '0000010100000110'
    if (outputType === 'string') return result;
    else return result.split('').map(char => charToDecimal(char));
};

const binaryToDecimal = (binary:string) => parseInt(binary, 2);

export const binaryToBytesArray = (binary: string) => {
    //binary string - '0000010100000110'
    const binaryArray = typeof binary === 'string' ? binary.split('').map(char => charToDecimal(char)) : binary;
    //binaryArray - [0,0,0,0,0,1,0,1,0,0,0,0,0,1,1,0]

    //now first check if input is valid binary
    let isValidBinary = true;
    binaryArray.forEach(eachDecimal => {
        if (eachDecimal !== 0 && eachDecimal !== 1) {
            isValidBinary = false; // Set flag to false if invalid value found
            return; // Exit the loop early
        }
    });
    if (!isValidBinary) {
        console.log('Invalid binary values found. Exiting...');
        // Perform actions to handle the error or exit the function
        return; // Exit the function
    }

    const bytes: number[] = [];
    let tempString = '';

    binaryArray.forEach((digit: number) => {
        tempString += digit;
        if (tempString.length > 7) {
            //check if its complete byte (8 bits) an then convert binary into byte equivalent
            bytes.push(binaryToDecimal(tempString));
            tempString = '';
        }
    });
    //bytes - [ 5, 6 ]
    return bytes;
};

export const arrayBufferToBase64 = (buffer: number[]) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export const getExt = (fileName: string = '') => {
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    return ext;
}