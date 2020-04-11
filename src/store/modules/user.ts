import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage'
import { Config } from '@/settings'

interface LoginPayload {
  username: string,
  token: string,
  userData: any
}

export interface IUserState {
  isAdmin: boolean,
  userName: string,
  token: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public isAdminKey: string = 'IS_ADMIN'
  public userNameKey: string = 'USER_NAME'
  public userDataKey: string = 'USER_DATA'
  public userRoleKey: string = 'USER_ROLE'

  public isAdmin: boolean = getLocalStorage(this.isAdminKey) || false
  public userName: string = getLocalStorage(this.userNameKey) || 'admin'
  public token: string = getLocalStorage(Config.jwt_token_name) || ''
  public userRole: number = getLocalStorage(this.userRoleKey) || 0
  public userData: any = getLocalStorage(this.userDataKey) || {}

  @Mutation
  private UPDATE_IS_ADMIN (isAdmin: boolean) {
    this.isAdmin = isAdmin
  }

  @Mutation
  private UPDATE_USER_NAME (userName: string) {
    this.userName = userName
  }

  @Mutation
  private UPDATE_TOKEN (token: string) {
    this.token = token
  }

  @Mutation
  private UPDATE_USER_ROLE (userRole: number) {
    this.userRole = userRole
  }

  @Mutation
  private UPDATE_USER_DATA (userData: any) {
    this.userData = userData
  }

  // 用户退出登录
  @Action
  public logout () {
    removeLocalStorage(this.isAdminKey)
    removeLocalStorage(Config.jwt_token_name)
    removeLocalStorage(this.userNameKey)
    removeLocalStorage(this.userRoleKey)
    removeLocalStorage(this.userDataKey)
    this.UPDATE_IS_ADMIN(false)
  }

  @Action
  public login (payload: LoginPayload) {
    const { username, token, userData } = payload
    setLocalStorage(this.isAdminKey, true) // 是否为管理员
    setLocalStorage(this.userNameKey, username)
    setLocalStorage(Config.jwt_token_name, token)
    setLocalStorage(this.userDataKey, userData)
    setLocalStorage(this.userRoleKey, userData.user.role)

    this.UPDATE_IS_ADMIN(true)
    this.UPDATE_USER_NAME(username)
    this.UPDATE_TOKEN(token)
    this.UPDATE_USER_ROLE(userData.user.role)
    this.UPDATE_USER_DATA(userData)
  }
}

export const UserModule = getModule(User)
