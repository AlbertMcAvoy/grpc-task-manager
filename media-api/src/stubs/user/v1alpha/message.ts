/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "user.v1alpha";

export enum UserRole {
  USER_ROLE_BASIC = 0,
  USER_ROLE_ADMIN = 1,
  UNRECOGNIZED = -1,
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
  role: UserRole;
}

export interface RegisterRequest {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisterResponse {
  user: User | undefined;
}

export interface UpdateRequest {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UpdateResponse {
  user: User | undefined;
}

export interface DeleteRequest {
  id: string;
}

export interface DeleteResponse {
  user: User | undefined;
}

export interface UpdatePasswordRequest {
  id: string;
  password: string;
}

export interface UpdatePasswordResponse {
  user: User | undefined;
}

export interface FindRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface FindResponse {
  user: User[];
}

export interface CheckPasswordRequest {
  email: string;
  password: string;
}

export interface CheckPasswordResponse {
  status: CheckPasswordResponse_STATUS;
  user: User | undefined;
}

export enum CheckPasswordResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export interface MakeAdminRequest {
  id: string;
  email: string;
}

export interface MakeAdminResponse {
  user: User | undefined;
}

export const USER_V1ALPHA_PACKAGE_NAME = "user.v1alpha";
