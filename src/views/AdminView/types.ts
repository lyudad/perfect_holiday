export type TUpdateUser = {
  email?: string
  first_name?: string
  last_name?: string
}

export interface IMatchParams {
  id: string
}

export interface IMailVars {
  firstName: string
  lastName: string
  email: string
}
