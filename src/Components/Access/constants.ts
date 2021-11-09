import { IPermission } from './types'

export const superRole: IPermission = {
  rejectDaysOff: true,
  approveDaysOff: true,
  editOwnDaysOff: true,
  editEmployeesDaysOff: true,
  seeDashboard: true,
  seeUsersList: true,
  createUser: true,
  updateUser: true,
  deleteUser: true,
  sendPassword: true,
  blockUser: true,
  unblockUser: true,
}

export const adminRole: IPermission = {
  rejectDaysOff: true,
  approveDaysOff: true,
  editOwnDaysOff: true,
  editEmployeesDaysOff: true,
  seeDashboard: true,
  seeUsersList: true,
  sendPassword: true,
  blockUser: true,
  unblockUser: true,
}

export const employeeRole: IPermission = {
    editEmployeesDaysOff: true,
    seeDashboard: true,
}