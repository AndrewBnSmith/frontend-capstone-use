import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-goal',
  templateUrl: './update-goal.component.html',
  styleUrls: ['./update-goal.component.css']
})
export class UpdateGoalComponent implements OnInit {

  id!:number;
  goal: Goal = new  Goal();
  constructor(private goalService : GoalsService , private route : ActivatedRoute , private router : Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.goalService.GetGoalById(this.id).subscribe(data => {
      this.goal=data;
    }, error => console.log(error));
  }

  onSubmit(){
    console.log(this.goal);
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

}
