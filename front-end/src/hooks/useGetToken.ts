"use client";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

interface IJwtPayload {
  Id: string;
  Email: string;
  Name: string;
  Role: string;
}

const GetDataByToken = (token: string): any | null => {
  const decoded = jwtDecode<JwtPayload>(token);
  const id = decoded?.Id;
  const email = decoded?.Email;
  const name = decoded?.Name;
  const role = decoded?.Role;

  return { id, email, name, role };
};

export default GetDataByToken;
