import i18n from '@/lang'

export enum FormStatus {
  UNPUBLISHED = '0',
  PUBLISHED = '1'
}

export const FormStatusText = {
  [FormStatus.UNPUBLISHED]: i18n.t('common.unPublished'),
  [FormStatus.PUBLISHED]: i18n.t('common.published')
}

export const FormStatusColor = {
  [FormStatus.UNPUBLISHED]: 'danger',
  [FormStatus.PUBLISHED]: 'success'
}
