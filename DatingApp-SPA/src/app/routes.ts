import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { MembersComponent } from './members/members.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MembersListResolver } from './_resolvers/members-list.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MembersComponent, resolve: {users: MembersListResolver} },
      { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
      { path: 'friends', component: FriendsComponent },
      { path: 'messages', component: MessagesComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
