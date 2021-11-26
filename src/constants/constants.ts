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

export const statusItem = {
  declined: 'declined',
  approved: 'approved'
}

export const sellectItemColor = ( status:string ) => {
  if(status === statusItem.declined){
    return 'red'
  } else if(status === statusItem.approved){
    return 'green'
  }
  return 'yellow'
}

export const token = `Bearer ${localStorage.getItem('token')}`;
export const role = localStorage.getItem('role');
export const userId = localStorage.getItem('userId');
