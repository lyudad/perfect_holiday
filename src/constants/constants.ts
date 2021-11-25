export const url = {
  users: 'users/',
  admin: 'admin/',
  login: 'login/',
  auth: 'auth/',
  casual: 'casual/',
  mail: 'mail/',
  pushPassword:'push-password/',
};
export const sellectItemColor = (status:string) => {
  if(status === 'declined'){
    return 'red'
  } else if(status === "approved"){
    return 'green'
  }
  return 'yellow'
}