export enum UserType {
    ADMIN = 'admin',
    ENTEPRENEUR = 'entrepreneur',
    CASUAL = 'casual'
}

export interface User {
    id: number,
    email: string,
    username: string,
    type: UserType
}

export interface UserWithPasswordHash extends User {
    password_hash: string
}