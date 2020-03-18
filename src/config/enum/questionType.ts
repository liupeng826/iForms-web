/**
 * 題目类型
 */

export enum questionType {
  SINGLE_CHOICE = '单选',
  MULTIPLE_CHOICE = '多选',
  TEXT_QUESTION = '文本',
  RATING = '评分',
  DATE_QUESTION = '日期',
  NET_PROMOTER_SCORE = '净推荐值',
}

export type questionTypeText = '单选' | '多选' | '文本' | '评分' | '日期' | '净推荐值'

export enum questionType1 {
  SINGLE_CHOICE = 1,
  MULTIPLE_CHOICE = 2,
  TEXT_QUESTION = 3,
  RATING = 4,
  DATE_QUESTION = 5,
  NET_PROMOTER_SCORE = 6,
}

export type questionTypeId = 1 | 2 | 3 | 4 | 5 | 6
