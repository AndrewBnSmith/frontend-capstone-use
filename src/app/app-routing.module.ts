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
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo : 'login' , pathMatch : 'full'},
  {path:'register',component:RegisterComponent},
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
