declare namespace User {
  export interface IUser {
    id?: string,
    userId: string,
    userName: string,
    sex: string,
    email: string,
    phone: string,
    client: IClient,
    dept: IDept
  }
  export interface IClient {
    id: string,
    name: string,
    token: string,
    isActive: string
  }
  export interface IDept {
    id: string,
    deptId: string,
    name: string,
    pid: string,
    isActive: string,
    createdDate: string
  }
}
