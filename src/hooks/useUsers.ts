import { useQuery } from 'react-query'
import axios from 'axios'
import { url } from 'constants/constants'
export type UserRoleType = 'employee' | 'admin' | 'super'
const { REACT_APP_BASE } = process.env

export type User = {
  role: UserRoleType
  email: string
  password: string
  first_name: string
  last_name: string
  is_block: boolean
  available_vacation: number
  available_sick_days: number
}

export default function useGetListOfUsers() {
  return useQuery('users', async (): Promise<Array<User>> => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.users}`)
    return data
  })
}
