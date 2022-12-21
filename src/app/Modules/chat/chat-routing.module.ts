import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {
    path: "",
    component: ChatComponent
  },
  {
    path: ":id",
    component: MessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
