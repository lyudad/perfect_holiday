import store from 'Redux/store';
import { APPROVED, DECLINED, CHANGED } from './statuses';

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
