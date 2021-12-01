import { APPROVED, DECLINED } from './statuses';

export enum Role {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
  SUPER = 'super',
}

export const url = {
  users: 'users/',
  admin: 'admin/',
  login: 'login/',
  auth: 'auth/',
  casual: 'casual/',
  mail: 'mail/',
  pushPassword: 'push-password/',
  pending: 'casual/pending',
};

export const sellectItemColor = (status: string) => {
  if (status === DECLINED) {
    return 'red';
  } else if (status === APPROVED) {
    return 'green';
  }
  return 'yellow';
};
