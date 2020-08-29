import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MsgService } from './msg.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {


    constructor(private messageService: MessageService, private msg: MsgService) { }

    ngOnInit(): void {
    }

    onConfirm() {
        this.clear();
        this.msg.confirmEvent = { type: 'D' };
    }

    onReject() {
        this.messageService.clear('c');
    }

    clear() {
        this.messageService.clear();
    }

}
