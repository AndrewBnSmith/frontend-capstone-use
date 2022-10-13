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
  total!:number;
  contribute!:number;

  chartSeries: ApexNonAxisChartSeries = [0,66];

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


  goal: Goal = new Goal();
  fromDate!: Date;
  pipe = new DatePipe('en-US');
  newDate!: any;
  monthly!:number;

    

  constructor(private goalService : GoalsService , private router : Router) {
    
   }

  ngOnInit(): void {}

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

  findMonthlyPayment(total:number,contribute:number, year:number){
    this.monthly = (total-contribute)/(year*12)
    return this.monthly.toFixed(0)
  }
  fillTotal(total:number){
    this.total = total
    return console.log("total")
  }
  fillContribute(contribute:number){
    this.contribute = contribute
    return console.log("contribute")
  }
  update(){
    this.chartSeries.push(this.total,this.contribute)
    console.log("this is chart array" + this.chartSeries)
  }

 



}
