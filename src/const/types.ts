export interface User {
  _id?: string;
  name: string;
}

export interface ClientDataStatus {
  STATIC_CLIENT_DATA:string,
  UPDATE_CLIENT_DATA:string,
  ADD_CLIENT_DATA:string
}

export const ClientStatus = {
  STATIC_CLIENT_DATA:'static_client_data',
  UPDATE_CLIENT_DATA:'update_client_data',
  ADD_CLIENT_DATA:'add_client_data'
}