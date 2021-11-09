import { IPermission, IUser, TRole } from "./types";
import { employeeRole, adminRole, superRole } from "./constants";

export const getAccess = (role: TRole): IPermission => {
  switch (role) {
    case "super":
      return superRole;
    case "admin":
      return adminRole;
    case "employee":
      return employeeRole;
    default:
      return {};
  }
};

export const hasAccess = (user: IUser, permissionName: string): boolean => {
  if (!user?.role) {
    return false;
  }
  const permission = getAccess(user.role);
  return Object.prototype.hasOwnProperty.call(permission, permissionName);
};
