export type FormDataLogin = {
    email : string,
    password : string
}

export type ErrorsLogin = {
    email ?: string,
    password ?: string,
    auth ?: string
}

export type UserLogin = {
    name : string,
    email : string
}