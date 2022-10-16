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
import { AboutComponent } from './about/about.component';
import { AboutUsComponent } from './about-us/about-us.component';
const routes: Routes = [
  {path:'',component:WelcomeHomeComponent},
  {path:'home-welcome/login',component:LoginComponent},
  {path:'login/register',component:RegisterComponent},
  {path:'login/register/login',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo : 'home-welcome' , pathMatch : 'full'},
  { path : "home/about" , component : AboutComponent },
  {path:'home-welcome/register',component:RegisterComponent},
  {path:'about',component:AboutComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'home',component:HomeComponent,
  children : [
    { path : '' , component : MainComponent },
    { path : 'home' , component : MainComponent },
    { path : "profile" , component : ProfileComponent },
    { path : "create-goal" , component : CreateGoalComponent },
    { path : "goals" , component : GoalListComponent },
    { path : 'update-goal/:id' , component : UpdateGoalComponent},
    {path:'register',component:RegisterComponent},
    { path : 'details-goal/:id' , component : GoalDetailsComponent},
    { path : 'about-us' , component : AboutUsComponent},

    ] },
    {
      path: "**",
      redirectTo: "home"
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
