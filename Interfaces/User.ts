type UserType = 'entrepreneur' | 'admin' | 'casual';

export interface User {
    id: number,
    username: string,
    type: UserType
}