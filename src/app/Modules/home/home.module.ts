import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';

import { HomeRoutingModule } from './home-routing.module';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home.component';

import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';


import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AddComponent } from './add/add.component';
import { RightmenuComponent } from './rightmenu/rightmenu.component';
import { PeopleComponent } from './common/people/people.component';
import { StoriesComponent } from './posts/stories/stories.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './posts/post/post.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { MypostsComponent } from './profile/myposts/myposts.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';
import { SinglePostComponent } from './comment/single-post/single-post.component';
import { AddStoryComponent } from './posts/stories/add-story/add-story.component';
import { TextComponent } from './posts/stories/add-story/text/text.component';
@NgModule({
  declarations: [
    SidemenuComponent,
    PostsComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    AlertsComponent,
    AddComponent,
    StoriesComponent,
    RightmenuComponent,
    PeopleComponent,
    DiscoverComponent,
    ProfileComponent,
    PostComponent,
    FollowersComponent,
    FollowingComponent,
    MypostsComponent,
    SettingsComponent,
    CommentComponent,
    SinglePostComponent,
    AddStoryComponent,
    TextComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    ImageCropperModule
  ]
})
export class HomeModule { }
