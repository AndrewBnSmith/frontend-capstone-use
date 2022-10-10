import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {

  chart: any = [];
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
    this.id = this.route.snapshot.params['id'];
    this.goalService.getChartData(this.id).subscribe(res => {
      console.log(res)

      let goalTotal = res['goals'].map((res: { main: { goalTotal: any; }; }) => res.main.goalTotal)
      let contribution = res['goals'].map((res: { main: { contribution: any; }; }) => res.main.contribution)
      let years = res['goals'].map((res: { dt: any; }) => res.dt)

      let goals: [] = []
      years.forEach((res: number) => {
        let jsdate = new Date(res * 1000)
        goals.push()
      })
      this.chart = new Chart('canvas',  {
        type: 'pie',
        data: {
          labels: goals,
          datasets: [
            {
              data: goalTotal,
              borderColor: '#3cba9f',             
            },
            {
              data: contribution,
              borderColor: '#ffcc00',
            },
          ]
        },
        
      })
      
    })

    
    
  }
  
}  



  


