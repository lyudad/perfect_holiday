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

export const token = `Bearer ${localStorage.getItem('token')}`;
export const role = localStorage.getItem('role');
