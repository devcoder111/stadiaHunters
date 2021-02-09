import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'text';
}

export class TitleQuestion extends QuestionBase<string> {
    controlType = 'title';
  }