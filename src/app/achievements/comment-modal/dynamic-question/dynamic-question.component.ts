import { Component, Input, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['../../comment/comment.component.sass'],
})
export class DynamicQuestionComponent {

  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid; }

}
