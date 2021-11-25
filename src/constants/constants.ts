export const url = {
  users: 'users/',
  admin: 'admin/',
  login: 'login/',
  auth: 'auth/',
  casual: 'casual/',
};
export const sellectItemColor = (status:string) => {
  if(status === 'declined'){
    return 'red'
  } else if(status === "approved"){
    return 'green'
  }
  return 'yellow'
}