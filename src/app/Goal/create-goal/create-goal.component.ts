import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'chart.js';



@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {
  
  total!:number;
  contribute!:number;
  goalTotal!:number
  goal: Goal = new Goal();
  fromDate!: Date;
  pipe = new DatePipe('en-US');
  newDate!: any;
  monthly!:number;
  formattedTotal!:number

  

    

  constructor(private goalService : GoalsService , private router : Router) {
    
   }

  ngOnInit(): void {
    
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

  

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

  findMonthlyPayment(total:number,contribute:number, year:number){
    this.monthly = (total-contribute)/(year*12)
    if (isNaN(this.monthly))this.monthly= 0;
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
  
  findTotalPayment(total:number,contribute:number){
    this.formattedTotal = (total-contribute)
    if (isNaN(this.formattedTotal))this.formattedTotal= 0
    return this.formattedTotal.toFixed(0)
  }
  

 



}
