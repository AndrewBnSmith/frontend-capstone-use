import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  goals !: Goal[];
  constructor(private goalService : GoalsService , private router : Router) { }

  ngOnInit(): void {
    this.getGoals();
  }

  getGoals(){
    this.goalService.getGoalsList().subscribe(data => {
      this.goals = data;
      console.log(this.goals);
    });
  }

  detailsGoal(id:number){
    this.router.navigate(['/home/details-goal',id]);
  }

  updateGoal(id:number){
    this.router.navigate(['/home/update-goal',id]);
  }


  // toggleDetails(index: any){
  //   this.goals[index]. = !this.goals[index].showDescription;
  // }

  deleteGoal(id : number){
    Swal.fire({
      title: 'Are you sure you want to delete this goal?',
      text: "You won't be able to revert back if you hit confirm",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.goalService.deleteGoal(id).subscribe(data =>{
          console.log(data);
          this.getGoals();
        })
        Swal.fire(
          'Deleted!',
          'The goal has been deleted.',
          'success'
        )
      }
    })
  }

}

