import { TUserState } from './userSlice';

const getUserName = (state: TUserState) => state.user?.name;

export default { getUserName };
