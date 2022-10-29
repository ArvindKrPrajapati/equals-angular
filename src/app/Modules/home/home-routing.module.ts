import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ChatComponent } from './chat/chat.component';
import { CommentComponent } from './comment/comment.component';
import { DiscoverComponent } from './discover/discover.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { HomeComponent } from './home.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'posts',
      pathMatch: 'full'
    },
    {
      path: 'posts',
      component: PostsComponent
    },
    {
      path: 'search',
      component: SearchComponent
    },
    {
      path: 'alerts',
      component: AlertsComponent
    },
    {
      path: 'chats',
      component: ChatComponent
    },
    {
      path: 'add-post',
      component: AddComponent
    },
    {
      path: 'discover-people',
      component: DiscoverComponent
    },
    {
      path: 'profile/:id',
      component: ProfileComponent
    },
    {
      path: 'followers/:id',
      component: FollowersComponent
    },
    {
      path: 'following/:id',
      component: FollowingComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: 'comment/:id',
      component: CommentComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
