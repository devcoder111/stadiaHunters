import { Injectable } from '@angular/core';

import { QuestionBase } from '../dynamic-question/question-base';
import { TitleQuestion, TextboxQuestion } from '../dynamic-question/question-textbox';
import { ImageQuestion } from '../dynamic-question/question-image';
import { VideoQuestion } from '../dynamic-question/question-video';
import { LinkQuestion, StateShareQuestion } from '../dynamic-question/question-state-share';
import { BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuestionService {

  private questionsSource = new BehaviorSubject<any>(undefined)
  private questions = this.questionsSource.asObservable()

  private responsesSource = new BehaviorSubject<any[]>([])
  private responses = this.responsesSource.asObservable()

  responses$: any[] = []
  questions$: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: '1',
      hint: 'Insert text.',
      order: 1
    }),
  ];

  getQuestions() {
    this.questionsSource.next(this.questions$)
    return this.questions
  }

  getResponses(){
    return this.responses
  }

  removeQuestion(){
    this.questions$.pop()
    this.questionsSource.next(this.questions$)

    if(this.questions$.length < this.responses$.length){
      this.responses$.pop()
      this.responsesSource.next(this.responses$)
    }
  }

  addQuestion(type:string){
    let position = this.questions$.length + 1
    switch (type) {
      case 'title':
        this.questions$.push(
          new TitleQuestion({
            key: `${position}`,
            hint: 'Insert title.',
            order: position
          }),
        )
        break;
      case 'text':
        this.questions$.push(
          new TextboxQuestion({
            key: `${position}`,
            hint: 'Insert text.',
            order: position
          }),
        )
        break;
      case 'image':
        this.questions$.push(
          new ImageQuestion({
            key: `${position}`,
            hint: 'Insert image url.',
            order: position
          }),
        )
        break;
      case 'video':
        this.questions$.push(
          new VideoQuestion({
            key: `${position}`,
            hint: 'Insert video url.',
            order: position
          }),
        )
        break;
      case 'link':
        this.questions$.push(
          new LinkQuestion({
            key: `${position}`,
            hint: 'Insert link.',
            order: position
          }),
        )
        break;
      case 'state-share':
        this.questions$.push(
          new StateShareQuestion({
            key: `${position}`,
            hint: 'Insert state share link.',
            order: position
          }),
        )
        break;
      default:
        break;
    }

    this.questionsSource.next(this.questions$)
  }

  updateResponses(response: any){
    this.responses$ = this.buildResponse(response)
    this.questions$ = this.questions$.map(element =>{
      element.value = response[element.key]
      return element
    })
    this.responsesSource.next(this.responses$)
  }

  buildResponse(response: any){
    return this.questions$.map(value => {
      return {
        'position': value.key,
        'type': value.controlType,
        'text': this.buildText(response[value.key])
      }
    })
  }

  buildText(text: string){
    if(text.includes("embed")){
      return text
    } else if(text.includes("https://www.youtube.com/")){
      let videoId = text.split("v=")[1].substring(0, 11)
      return `https://www.youtube.com/embed/${videoId}`
    } else if(text.includes("https://youtu.be/")){
      let videoId = text.substring(17, 28)
      return `https://www.youtube.com/embed/${videoId}`
    } else {
      return text.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }
}