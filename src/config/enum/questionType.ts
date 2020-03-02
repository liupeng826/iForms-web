/**
 * 題目类型
 */

export enum questionType {
  SINGLE_CHOICE = '单选',
  MULTIPLE_CHOICE = '多选',
  TEXT_QUESTION = '文本',
  SYMBOL_SCORE = '符号',
  NET_PROMOTER_SCORE = '净推荐值',
  DATE_QUESTION = '日期'
}

export type questionTypeText = '单选' | '多选' | '文本' | '符号' | '净推荐值' | '日期'
