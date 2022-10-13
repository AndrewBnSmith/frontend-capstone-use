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
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WelcomeHomeComponent } from './welcome-home/welcome-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { NgChartsModule } from 'ng2-charts';

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
    RegisterComponent,
    WelcomeHomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,

    
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgxChartsModule,
    MatSliderModule,
    NgApexchartsModule,
    DatePipe,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
