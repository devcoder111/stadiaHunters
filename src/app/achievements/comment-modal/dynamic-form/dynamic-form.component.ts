import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../dynamic-question/question-base';
import { QuestionControlService } from './question-control.service';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() size : number = 0 
  @Input() questions : QuestionBase<string>[] = [];

  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService, private qs: QuestionService) {  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes)
    this.updateForm()
  }

  updateForm(){
    this.form = this.qcs.toFormGroup(this.questions ? this.questions : []);
    this.form.valueChanges.subscribe(x => {
      this.qs.updateResponses(x)
    })
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
