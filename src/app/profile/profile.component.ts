import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/services/registration.service';
import { User } from '../Models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user_session : any;
  user : User = new User();
  constructor(private service : RegistrationService , private router : Router) { }

  ngOnInit(): void {
      this.user_session=sessionStorage.getItem("user_id");
      this.service.GetUserById(this.user_session).subscribe(data => {
        this.user_session = data;
        console.log(this.user_session);
      })
  }

  onSubmitInfo(){
    console.log(this.user_session);
    this.service.EditProfile(this.user_session.id,this.user_session).subscribe( data => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Profile successfully updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.ngOnInit();
    }, error => console.log(error));
  }

  onSubmitPass(){
    console.log(this.user_session);
    this.service.EditPassword(this.user_session.id,this.user).subscribe( data => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Password successfully updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.ngOnInit();
    }, error => console.log(error));
  }

  goToUpdate(){
    document.getElementById("edits")?.scrollIntoView({behavior:"smooth"});
  }
}
