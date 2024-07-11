import {  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewsComponent } from './views/views.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { PollsComponent } from './polls/polls.component';
import { AuthGuard } from './guard/auth.guard';
import { AiChatComponent } from './ai-chat/ai-chat.component';
// import { EducateComponent } from './educate/educate.component';




const routes: Routes = [
  {path:'',redirectTo: '/home',pathMatch:'full'},
  {path: 'home', component: HomeComponent, }, 
  {path:'login',component:LoginComponent},
  {path: 'signup',component:SignupComponent},
  
  { path: 'educate', component: AiChatComponent, canActivate: [AuthGuard] },
  { path: 'views', component: ViewsComponent, canActivate: [AuthGuard] },
  { path: 'incidents', component: IncidentsComponent, canActivate: [AuthGuard] },
  { path: 'polls', component: PollsComponent, canActivate: [AuthGuard] } 

];

export default routes;
