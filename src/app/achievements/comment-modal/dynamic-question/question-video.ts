import { QuestionBase } from './question-base';

export class VideoQuestion extends QuestionBase<string> {
  controlType = 'video';
}