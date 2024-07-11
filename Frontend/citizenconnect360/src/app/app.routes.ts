import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {path:'',redirectTo: 'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  { path:'home',component:HomeComponent}

];

export default routes;
