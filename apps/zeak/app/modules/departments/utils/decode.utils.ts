export const decodeValue = (value: Uint8Array<ArrayBufferLike> | null | undefined) => {
    if (value) {
        try {
            return Buffer.from(value).toString('utf8');
        } catch (err) {
            console.error("Error decoding value:", err);
            return value;
        }
    }
    return value;
};

export const hexToString = (hex: string) => {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
};