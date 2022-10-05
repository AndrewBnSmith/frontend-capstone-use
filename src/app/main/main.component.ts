import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalsService } from 'src/services/goals.service';
import { Goal } from '../Models/goal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  goals!: Goal[];
  goalList!: Goal[];
  constructor(private goalService : GoalsService , private router : Router) { }

  ngOnInit(): void {
    this.getGoals();
    this.getAllGoals();
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

}
