// replace to database search function
import { userTable } from '../src/mock/user';
import { UserInfo } from '../src/types/navbar';
export function userExists(email: string): boolean {
    return userTable.some(user => user.email === email);
}


export function getUserInfo( email:string,password:string): UserInfo{
    return userTable.find(user=>user.email === email && user.password === password) as UserInfo;
}