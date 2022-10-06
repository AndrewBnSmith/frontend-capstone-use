import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {

  chart = [];
  id!: number;
  goal!: Goal;


  view: any = [500, 500];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28']
  };
  data: any;


  constructor(private goalService: GoalsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.goal = new Goal();
    this.goalService.GetGoalById(this.id).subscribe(data => {
      this.goal = data;
    });
  }  
}


  


