export enum UserType {
    ADMIN = 'admin',
    ENTEPRENEUR = 'entepreneur',
    CASUAL = 'casual'
}

export interface User {
    id: number,
    email: string,
    username: string,
    type: UserType
}

export interface UserWithPasswordHash extends User {
    passwordHash: string
}