// Original file: proto/questions.proto

import type { QuestionItem as _questionPackage_QuestionItem, QuestionItem__Output as _questionPackage_QuestionItem__Output } from '../questionPackage/QuestionItem';

export interface QueryResponse {
  'items'?: (_questionPackage_QuestionItem)[];
  'totalItems'?: (number);
}

export interface QueryResponse__Output {
  'items'?: (_questionPackage_QuestionItem__Output)[];
  'totalItems'?: (number);
}
