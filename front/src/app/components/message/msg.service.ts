import { Injectable, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

const INFO = 'info';
const SUCESS = 'success';
const WARN = 'warn';
const ERROR = 'error';

interface Confirm {
  type: string
}

@Injectable({
  providedIn: 'root',
})
export class MsgService implements OnInit {

  config: {};

  public _confirmEvent = new BehaviorSubject<Confirm>({ type: '' });

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  getConfig(type, title, msg): Object {
    return { severity: type, summary: title, detail: msg, life: 5000 };
  }

  add(type, title, msg) {
    this.messageService.add(this.getConfig(type, title, msg));
  }

  showSuccess(msg: string) {
    this.add(SUCESS, 'Success', msg);
  }

  showInfo(msg: string) {
    this.add(INFO, 'Information', msg);
  }

  showWarn(msg: string) {
    this.add(WARN, 'Warning', msg);
  }

  showError(msg: string) {
    this.add(ERROR, 'Error', msg);
  }

  showConfirm(msg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: msg, detail: 'Confirme para prosseguir' });
  }


  get confirmEvent(): Confirm {
    return this._confirmEvent.value;
  }

  set confirmEvent(confirm: Confirm) {
    this._confirmEvent.next(confirm);
  }



}
