import { useQuery } from 'react-query';
import axios from 'axios';
import { token, url } from 'constants/constants';
import { IUserId, TBookkHoliday, User, TApprovedDay, TDeleteUser } from './types';
import { TUpdateUser } from 'views/AdminView/types';
const { REACT_APP_BASE } = process.env;

export default function useGetListOfUsers() {
  return useQuery('users', async (): Promise<Array<User>> => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.users}`, {
      headers: { Authorization: token },
    });
    return data;
  });
}

export function useAllNotApprovedRestDays() {
  return useQuery('casual', async (): Promise<Array<User>> => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.pending}`, {
      headers: { Authorization: token },
    });
    return data;
  });
}

export const toBlockUnblockUser = async (dataIndex: boolean, key: IUserId) =>
  axios.put(
    `${REACT_APP_BASE}${url.users}${key.id}`,
    {
      is_block: !dataIndex,
    },
    {
      headers: { Authorization: token },
    },
  );

export const toUpdateUserInfo = async (values: TUpdateUser, userId: string) =>
  axios.put(`${REACT_APP_BASE}${url.users}${userId}`, values, {
    headers: { Authorization: token },
  });

export const bookigRestDays = async (values: TBookkHoliday, userId: string) =>
  axios.post(`${REACT_APP_BASE}${url.casual}${userId}`, values, {
    headers: { Authorization: token },
  });

export const toApprovedOrDisapproveRestDay = async (values: TApprovedDay) => {
  axios.put(`${REACT_APP_BASE}${url.casual}${values.userId}`, values, {
    headers: { Authorization: token },
  });
};

export const toDeleteUser = async (values: TDeleteUser) => {
  axios.delete(`${REACT_APP_BASE}${url.users}${values.id}`, {
    headers: { Authorization: token },
  });
};