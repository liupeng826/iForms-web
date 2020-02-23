declare namespace User {
  export interface IUser {
    id?: string,
    userId: string,
    userName: string,
    sex: string,
    email: string,
    phone: string,
    client: IClient,
    market: IMarket,
    branch: IBranch
  }
  export interface IClient {
    id: string,
    name: string,
    token: string,
    isActive: string
  }
  export interface IMarket {
    id: string,
    marketId: string,
    isActive: string,
    description: string
  }
  export interface IBranch {
    id: string,
    branchId: string,
    name: string,
    marketId: string,
    email: string,
    contactNo: string,
    address: string,
    isActive: string
  }
}
