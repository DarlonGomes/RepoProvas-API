import bcrypt from "bcrypt";

export interface EncryptInterface { 
    hashDataBcrypt: (data: string) => string;
    validateBcryptData: (data: string, hashData: string) => boolean;
}


export const encryptUtils : EncryptInterface = { 

    hashDataBcrypt: (data) => {
        return bcrypt.hashSync(data, 10);
    },
    validateBcryptData: (data, hashData) =>{
        return bcrypt.compareSync(data, hashData);
    }
}
