export interface IUserId {
    id: string;
}

export type TUpdateUser = {
    id: string;
    first_name?: string;
    last_name?: string;
}