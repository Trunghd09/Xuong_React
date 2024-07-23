export interface User {
    _id?: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: "admin" | "member" | "guest";
}
