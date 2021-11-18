import { useQuery } from 'react-query';
import axios from 'axios';
import { url } from 'constants/constants';
import { IUserId, TBookkHoliday, User } from './types';
import { TUpdateUser } from 'views/AdminView/types';
const { REACT_APP_BASE } = process.env;

export default function useGetListOfUsers() {
  return useQuery('users', async (): Promise<Array<User>> => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.users}`);
    return data;
  });
}

export const toBlockUnblockUser = async (dataIndex: boolean, key: IUserId) =>
  axios.put(`${REACT_APP_BASE}${url.users}${key.id}`, {
    is_block: !dataIndex,
  });

export const toUpdateUserInfo = async (values: TUpdateUser, userId: string) =>
  axios.put(`${REACT_APP_BASE}${url.users}${userId}`, values);

export const bookigRestDays = async (values: TBookkHoliday, userId: string) =>
  axios.post(`${REACT_APP_BASE}${url.casual}${userId}`, values);
