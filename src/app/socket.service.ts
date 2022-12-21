import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }
  fetchMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  // listen event
  onFetchMessage() {
    return this.socket.fromEvent('fetchMessage');
  }
}
