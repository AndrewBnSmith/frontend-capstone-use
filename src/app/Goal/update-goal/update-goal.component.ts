import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApexNonAxisChartSeries } from 'ng-apexcharts';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-goal',
  templateUrl: './update-goal.component.html',
  styleUrls: ['./update-goal.component.css']
})
export class UpdateGoalComponent implements OnInit {
  total!:number;
  contribute!:number;
  monthly!:number;
  formattedTotal!: number;
  chartSeries: ApexNonAxisChartSeries = [0,1];

  id!:number;
  goal: Goal = new  Goal();

  fromDate!: Date;
  pipe = new DatePipe('en-US');
  newDate!: any;
  constructor(private goalService : GoalsService , private route : ActivatedRoute , private router : Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.goalService.GetGoalById(this.id).subscribe(data => {
      this.goal=data;
    }, error => console.log(error));
  }

  onSubmit(){
    console.log(this.goal);
    this.saveGoal();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully updated',
      showConfirmButton: false,
      timer: 1500
    })
    this.goalService.updateGoal(this.id,this.goal).subscribe( data => {
      this.goToGoalList();
    }, error => console.log(error));
  }

  goToGoalList(){
    this.router.navigate(['/home/goals']);
  }

  changeFormat(fromDate: Date) {
    let ChangedFormat = this.pipe.transform(this.fromDate, 'dd/MM/YYYY');
    this.newDate = ChangedFormat;
  }

  onClick() {
    this.changeFormat(this.fromDate);
    console.log(this.newDate);
  }

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

  saveGoal(){
    this.goalService.createGoal(this.goal).subscribe(data => {
      console.log(data);
      this.goToGoalList();
    },
    error => console.log(error));
  }
  findMonthlyPayment(total:number,contribute:number, year:number){
    this.monthly = (total-contribute)/(year*12)
    if (isNaN(this.monthly))this.monthly= 0
    return this.monthly.toFixed(0)
  }
  findTotalPayment(total:number,contribute:number){
    this.formattedTotal = (total-contribute)
    if (isNaN(this.formattedTotal))this.formattedTotal= 0
    return this.formattedTotal.toFixed(0)
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
