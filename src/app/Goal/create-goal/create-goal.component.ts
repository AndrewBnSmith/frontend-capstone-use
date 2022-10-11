import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';



@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {

	chartSeries: ApexNonAxisChartSeries = [50, 32];

chartDetails: ApexChart = {
    type: 'donut',
    toolbar: {
      show: true
    }
};

chartLabels = ["Total", "Contributed"];

chartTitle: ApexTitleSubtitle = {
    text: 'Leading Companies',
    align: 'center'
};

chartDataLabels: ApexDataLabels = {
    enabled: true
};

  goal: Goal = new Goal();
  fromDate!: Date;
  pipe = new DatePipe('en-US');
  newDate!: any;



  constructor(private goalService : GoalsService , private router : Router) {
    
   }

  ngOnInit(): void {
  }

  public total!: number;
  public contribute!: number;
  public totalYears!: number;
  public topNumber?:number;
  public bottomNumber?:number;
  public month?:number;
  public payment?:number;

  calculate(){
	this.month=this.totalYears*12;
	this.topNumber = this.total;
	this.bottomNumber = this.contribute;
	this.payment = Math.round(this.topNumber/ this.contribute)
	return this.chartSeries = [this.payment]
  }



  saveGoal(){
    this.goalService.createGoal(this.goal).subscribe(data => {
      console.log(data);
      this.goToGoalList();
    },
    error => console.log(error));
  }

  goToGoalList(){
    this.router.navigate(['/home/goals']);
  }

  onSubmit(){
    console.log(this.goal);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully added',
      showConfirmButton: false,
      timer: 1500
    })
    this.saveGoal();
    this.router.navigate(['/home']);

  }

  changeFormat(fromDate: Date) {
    let ChangedFormat = this.pipe.transform(this.fromDate, 'YYYY/MM/dd');
    this.newDate = ChangedFormat;
  }

  onClick() {
    this.changeFormat(this.fromDate);
    console.log(this.newDate);
  }

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

}
