import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage'
import { Config } from '@/settings'

interface LoginPayload {
  username: string,
  token: string,
  client_name: string,
  client_token: string
}

export interface IUserState {
  isAdmin: boolean,
  userName: string,
  token: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public isAdmin: boolean = getLocalStorage('IS_ADMIN') || false
  public userName: string = getLocalStorage('USER_NAME') || 'admin'
  public token: string = getLocalStorage(Config.jwt_token_name) || ''

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

  // 用户退出登录
  @Action
  public logout () {
    removeLocalStorage('IS_ADMIN')
    removeLocalStorage(Config.jwt_token_name)
    removeLocalStorage('USER_NAME')
    this.UPDATE_IS_ADMIN(false)
  }

  @Action
  public login (payload: LoginPayload) {
    const { username, token, client_name, client_token } = payload
    setLocalStorage('IS_ADMIN', true) // 是否为管理员
    setLocalStorage('USER_NAME', username)
    setLocalStorage(Config.jwt_token_name, token)
    setLocalStorage(Config.client_name, client_name)
    setLocalStorage(Config.client_token, client_token)
    this.UPDATE_IS_ADMIN(true)
    this.UPDATE_USER_NAME(username)
    this.UPDATE_TOKEN(token)
  }
}

export const UserModule = getModule(User)
