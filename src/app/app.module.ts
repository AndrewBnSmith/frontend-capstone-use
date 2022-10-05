import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateGoalComponent } from './Goal/create-goal/create-goal.component';
import { GoalListComponent } from './Goal/goal-list/goal-list.component';
import { GoalDetailsComponent } from './Goal/goal-details/goal-details.component';
import { UpdateGoalComponent } from './Goal/update-goal/update-goal.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GoalListComponent,
    CreateGoalComponent,
    GoalDetailsComponent,
    UpdateGoalComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
