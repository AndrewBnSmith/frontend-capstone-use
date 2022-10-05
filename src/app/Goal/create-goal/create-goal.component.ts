import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {

  goal: Goal = new Goal();

  constructor(private goalService : GoalsService , private router : Router) { }

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

  }
}
