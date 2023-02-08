import md5 from "md5";




export const isJson = <T>(string: T): Boolean => {
    try {
        if (typeof string === "string") JSON.parse(string);
        else JSON.stringify(string);
        return true;
    } catch (err) {
        return false;
    }
}

export const base64 = {
    encode: (string: string, charset: BufferEncoding | undefined = "utf8") => Buffer.from(string, charset).toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
    decode: (string: string, charset: BufferEncoding | undefined = "utf8") => Buffer.from(string, "base64").toString(charset),
    validate: (string: string) => {
        if (!string) return false;
        if (string.length % 4 > 0) return false;
        if (/[^a-zA-Z0-9\-_]/.test(string)) return false;
        return true;
    }
};


export const tokenizer = (secret_key: any) => {
    const secret = md5(secret_key);
    const separator = "::";
    return {
        create: function (data: string | object) {
            const encoded_data = isJson(data) ? JSON.stringify(data) : data;

            const token = encoded_data + separator + md5(encoded_data + secret);
            const base64encoded = base64.encode(token, "utf8");
            return base64encoded;
        },
        verify: function (token_string: string) {
            if (!token_string) return false;
            token_string = token_string.replace("Bearer ", "");
            const decoded = base64.decode(token_string, "utf8");
            const parts = decoded.split(separator);

            const validator = parts.pop();
            const encoded_data = parts.join(separator);

            if (md5(encoded_data + secret) === validator) {
                var data: any = (parts.length === 1) ? (isJson(parts[0]) ? JSON.parse(parts[0]) : parts[0]) : parts;
                try {
                    return JSON.parse(data);
                } catch (e) {
                    return data;
                }
            } else {
                return false;
            }
        }
    }
}
