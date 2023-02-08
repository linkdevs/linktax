// create login type
export interface Login {
    login: string;
    password: string;
}

export interface Register {
    document: string;
    name: string;
    email?: string;
    phone?: string;
    login: string;
    password: string;
}

export interface Company {
    id?: number;
    name: string;
    document: string;
    description?: string;
    email?: string;
    phone?: string;
    ddns: string;
}