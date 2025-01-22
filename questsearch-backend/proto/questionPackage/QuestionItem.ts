// Original file: proto/questions.proto

import type { Block as _questionPackage_Block, Block__Output as _questionPackage_Block__Output } from '../questionPackage/Block';
import type { Option as _questionPackage_Option, Option__Output as _questionPackage_Option__Output } from '../questionPackage/Option';

export interface QuestionItem {
  'id'?: (string);
  'type'?: (string);
  'title'?: (string);
  'solution'?: (string);
  'anagramType'?: (string);
  'blocks'?: (_questionPackage_Block)[];
  'options'?: (_questionPackage_Option)[];
  'siblingId'?: (string);
}

export interface QuestionItem__Output {
  'id'?: (string);
  'type'?: (string);
  'title'?: (string);
  'solution'?: (string);
  'anagramType'?: (string);
  'blocks'?: (_questionPackage_Block__Output)[];
  'options'?: (_questionPackage_Option__Output)[];
  'siblingId'?: (string);
}
