import { TUserState } from './userSlice';

const getUserName = (state: TUserState) => state.user;

export default { getUserName };
