import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGoalComponent } from './Goal/create-goal/create-goal.component';
import { GoalDetailsComponent } from './Goal/goal-details/goal-details.component';
import { GoalListComponent } from './Goal/goal-list/goal-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UpdateGoalComponent } from './Goal/update-goal/update-goal.component';
import { WelcomeHomeComponent } from './welcome-home/welcome-home.component';
const routes: Routes = [
  {path:'home-welcome/login',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo : 'home-welcome' , pathMatch : 'full'},
  {path:'home-welcome',component:WelcomeHomeComponent},
  {path:'register',component:RegisterComponent},
  // {path:'register-success',redirectTo: 'home'},
  {path:'home',component:HomeComponent,
  children : [
    { path : '' , component : MainComponent },
    { path : "profile" , component : ProfileComponent },
    { path : "create-goal" , component : CreateGoalComponent },
    { path : "goals" , component : GoalListComponent },
    { path : 'update-goal/:id' , component : UpdateGoalComponent},
    { path : 'details-goal/:id' , component : GoalDetailsComponent},
    ] },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
