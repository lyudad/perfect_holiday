export const url = {
  users: 'users/',
  admin: 'admin/',
  login: 'login/',
  auth: 'auth/',
  casual: 'casual/',
  mail: 'mail/',
  pushPassword:'push-password/',
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