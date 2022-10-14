import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalsService } from 'src/services/goals.service';
import { RegistrationService } from 'src/services/registration.service';
import { Goal } from '../Models/goal';
import { User } from '../Models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  goals!: Goal[];
  goalList!: Goal[];
  user_session : any;
  user : User = new User();


  constructor(private goalService : GoalsService , private router : Router, private service : RegistrationService) { }

  ngOnInit(): void {
    this.getGoals();
    this.getAllGoals();
    this.user_session=sessionStorage.getItem("user_id");
    this.service.GetUserById(this.user_session).subscribe(data => {
      this.user_session = data;
      console.log(this.user_session);
  })
  }
  

  getGoals(){
    this.goalService.getGoalsCount().subscribe(data => {
      this.goals = data;
      console.log(this.goals);
    });
  }

  private getAllGoals() {
    this.goalService.getGoalsList().subscribe(data => {
      this.goalList = data;
    });
  }

  updateGoal(id:number){
    this.router.navigate(['/home/update-goal',id]);
    
  }

  detailsGoal(id:number){
    this.router.navigate(['/home/details-goal',id]);
  }

  

}
