import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexDataLabels } from 'ng-apexcharts';
import { Goal } from 'src/app/Models/goal';
import { User } from 'src/app/Models/user';
import { GoalsService } from 'src/services/goals.service';
import { RegistrationService } from 'src/services/registration.service';




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

 
  
  chartLabels = ["Contributed", "Total"];
  
  chartTitle: ApexTitleSubtitle = {
    text: 'Goal Breakdown',
    align: 'center'
  };

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };

 
  user_session : any;
  user : User = new User();
  id!: number;
  goal!: Goal;


  goal_amount: any;

  newAmount!: number;
  currentProgress!: string;
  newGoalTotal!: string;
  monthlyPayment!: number 
  chart: any;
  newContribute!: number;
  pieChartData: any =[];
  


  constructor(private goalService: GoalsService, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private service : RegistrationService) {

  }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.goal = new Goal();
    this.goalService.GetGoalById(this.id).subscribe(data => {
      this.goal = data;
      window.dispatchEvent(new Event('resize'))
      this.monthlyPayment = (Math.round(this.goal.goalTotal - this.goal.contribute) / (this.goal.years*12));
      
    });
    
    this.user_session=sessionStorage.getItem("user_id");
      this.service.GetUserById(this.user_session).subscribe(data => {
        this.user_session = data;
        console.log(this.user_session);
      })
    this.loadGoals(this.id)
  }
  findMonthlyPayment(total:number,contribute:number, year:number){
    this.monthlyPayment = (total-contribute)/(year*12)
    if (isNaN(this.monthlyPayment))this.monthlyPayment= 0;
    return this.monthlyPayment.toFixed(0)
  }

  public loadGoals(id: number)
  {
    this.goalService.GetGoalById(id).subscribe( data => {
      console.log("test" , this.pieChartData)
      console.log("goal" , this.goal)
      this.goal = data;
      this.newContribute = this.goal.contribute;
      this.newAmount = this.goal.goalTotal - this.goal.contribute;
      this.currentProgress = "" + ((this.goal.contribute / this.goal.goalTotal) * 100) + "%"     
      this.pieChartData.push(this.newContribute) 
      this.pieChartData.push(this.newAmount) 
      console.log("data" , this.pieChartData)
      this.cdr.markForCheck();   
    });     
  };
 
}  

