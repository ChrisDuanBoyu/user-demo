import { USER_TOKEN_KEY } from './../const';

import { post} from './axios'

export interface User {
    username: string;
    password?: string;
    register_time?: number;
}

export function register(userInfo: User) {

    return post<{ token: string }>('/register', userInfo)
}
 
export function login(userInfo: User) {
    return post<{ token: string }>('/login', userInfo)
}
 


export function getUserInfo() {
    return post<User>('/user_info', {},{ headers: {token:localStorage.getItem(USER_TOKEN_KEY)||''}})
}
 