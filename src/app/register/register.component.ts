import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/services/registration.service';
import { User } from '../Models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user = new User();

  constructor(private service : RegistrationService , private router : Router) { }

  ngOnInit(): void {
  }

  RegisterUser(){
    this.service.registerUserFromRemote(this.user).subscribe(
      data =>{
        console.log("response received");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Succesfully registred ' + data.username,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/login']);
      } ,
      error =>{
        console.log("exception occured");
        Swal.fire('Error...', 'Email already exists', 'error');
      } 
    )
  }
}
