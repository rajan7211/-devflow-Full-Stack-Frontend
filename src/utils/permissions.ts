import { ROLES, type Role } from "./constants"

export function canManageUsers(role: Role): boolean {
  return role === ROLES.ADMIN
}

export function canManageProjects(role: Role): boolean {
  return role === ROLES.ADMIN || role === ROLES.MANAGER
}

export function canCreateTasks(role: Role): boolean {
  return role === ROLES.ADMIN || role === ROLES.MANAGER
}

export function canViewActivity(role: Role): boolean {
  return role === ROLES.ADMIN || role === ROLES.MANAGER
}

export function canAssignTasks(role: Role): boolean {
  return role === ROLES.ADMIN || role === ROLES.MANAGER
}

export function canDeleteProject(role: Role): boolean {
  return role === ROLES.ADMIN || role === ROLES.MANAGER
}

export function isAdmin(role: Role): boolean {
  return role === ROLES.ADMIN
}

export function isManager(role: Role): boolean {
  return role === ROLES.MANAGER
}

export function isDeveloper(role: Role): boolean {
  return role === ROLES.DEVELOPER
}
