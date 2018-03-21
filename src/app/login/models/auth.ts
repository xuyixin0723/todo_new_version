export class User {
    id: number;
    username: string;
    password: string;
}

export class Auth {
    user: User;
    hasError: boolean;
    errMsg: string;
    redirectUrl: string;
}
