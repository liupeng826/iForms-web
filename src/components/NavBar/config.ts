import { UserModule } from '@/store/modules/user'
import { roleEnum } from '@/config/enum/roleEnum'
import i18n from '@/lang'

export interface NavMenu {
  index: string
  icon?: string
  title: string
  hidden: boolean
  children?: NavSubMenu[]
}

export interface NavSubMenu extends NavMenu {
  auth?: string[]
}

const navigations: NavMenu[] = [
  {
    index: '/list',
    icon: 'el-icon-document',
    title: i18n.t('route.myForms').toString(),
    hidden: false
  },
  {
    index: '/create',
    icon: 'el-icon-s-promotion',
    title: i18n.t('route.createForm').toString(),
    hidden: false
  },
  {
    index: '/statistics/',
    icon: 'el-icon-data-line',
    title: i18n.t('route.statistics').toString(),
    hidden: false
  },
  // {
  //   index: '/dept',
  //   icon: 'el-icon-office-building',
  //   title: i18n.t('route.deptManagement').toString(),
  //   hidden: UserModule.userRole !== roleEnum.SUPER_ADMIN
  // },
  // {
  //   index: '/user',
  //   icon: 'el-icon-user-solid',
  //   title: i18n.t('route.userManagement').toString(),
  //   hidden: UserModule.userRole !== roleEnum.SUPER_ADMIN
  // },
  {
    index: '/setting',
    icon: 'el-icon-s-tools',
    title: i18n.t('route.changePassword').toString(),
    hidden: false
  }
]
export default navigations
