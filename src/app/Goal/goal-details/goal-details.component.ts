import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexDataLabels } from 'ng-apexcharts';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';




@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {



  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };

  chartLabels = ["Goal Total", "Contributed"];

  chartTitle: ApexTitleSubtitle = {
    text: 'Goal Breakdown',
    align: 'center'
  };

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };

 
  
  id!: number;
  goal!: Goal;

  goal_amount: any;

  newAmount!: number;
  currentProgress!: string;
  newGoalTotal!: string;
  monthlyPayment: number | undefined;
  chart: any;
  newContribute!: number;
  pieChartData: any =[this.newAmount, this.newContribute];
  


  constructor(private goalService: GoalsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.goal = new Goal();
    this.goalService.GetGoalById(this.id).subscribe(data => {
      this.goal = data;
    });
    this.loadGoals(this.id)
  }

  public loadGoals(id: number)
  {
    this.goalService.GetGoalById(id).subscribe( data => {
      console.log(this.pieChartData)
      this.goal = data;
      this.newContribute = this.goal.contribute;
      this.newAmount = this.goal.goalTotal - this.goal.contribute;
      this.currentProgress = "" + ((this.goal.contribute / this.goal.goalTotal) * 100) + "%"     
      this.newGoalTotal = "" + (this.newAmount / this.goal.goalTotal) * 100 + "%"
      // this.pieChartData.datasets[0].data[0] = ((this.goal.contribute / this.goal.goalTotal) * 100);
      // this.pieChartData.datasets[0].data[1] = (this.newAmount / this.goal.goalTotal) * 100;
      // this.pieChartData.push(5)
      // console.log(this.pieChartData)
      // this.chart?.update();
      // this.monthlyPayment = Math.round(this.newAmount / (this.goal.years*12));
      
      
    });     
  };
 
}  

