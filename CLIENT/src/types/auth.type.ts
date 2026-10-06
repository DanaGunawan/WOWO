export type registerType = {
    name: string,
    email: string,
    password: string,
    avatar?: string
}

export type loginType = {
    email : string,
    password: string
}

export interface userType {
_id : string,
name : string,
email : string,
avatar? : string | null,
createdAt : Date,
updatedAt : Date
}

