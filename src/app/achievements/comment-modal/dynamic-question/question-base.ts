export class QuestionBase<T> {
    value: string;
    key: string;
    hint: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
  
    constructor(options: {
        value?: string;
        key?: string;
        hint?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
      } = {}) {

      this.value = options.value || '';
      this.key = options.key || '';
      this.hint = options.hint || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
    }
  }