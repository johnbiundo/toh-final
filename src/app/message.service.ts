import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];

  write(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
