import { QuestionBase } from './question-base';

export class StateShareQuestion extends QuestionBase<string> {
  controlType = 'state-share';
}


export class LinkQuestion extends QuestionBase<string> {
  controlType = 'link';
}