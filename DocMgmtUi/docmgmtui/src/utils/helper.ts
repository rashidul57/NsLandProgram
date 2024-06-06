
export const decimalToBinary = (decimal: number) => decimal.toString(2);

export const charToDecimal = (char: string) => parseInt(char, 10);

export const byteToBinary = (bytes: number[], outputType: 'array' | 'string' = 'string') => {
    let result = '';
    for (let i = 0; i < bytes.length; i++) {
        const subResult = decimalToBinary(bytes[i]).padStart(8, '0');
        result += subResult;
    }
    if (outputType === 'string') return result;
    else return result.split('').map(char => charToDecimal(char));
};

const binaryToDecimal = (binary: string) => parseInt(binary, 2);

export const binaryToBytesArray = (binary: string) => {
    const binaryArray = typeof binary === 'string' ? binary.split('').map(char => charToDecimal(char)) : binary;
    let isValidBinary = true;
    binaryArray.forEach(eachDecimal => {
        if (eachDecimal !== 0 && eachDecimal !== 1) {
            isValidBinary = false;
            return;
        }
    });
    if (!isValidBinary) {
        console.log('Invalid binary values found. Exiting...');
        return;
    }

    const bytes: number[] = [];
    let tempString = '';

    binaryArray.forEach((digit: number) => {
        tempString += digit;
        if (tempString.length > 7) {
            bytes.push(binaryToDecimal(tempString));
            tempString = '';
        }
    });
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