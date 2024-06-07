import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post, User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  userForm!: FormGroup;

  userId!: number;

  userFound: User = {} as User;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
   
    this.userService.findUserById(this.userId).subscribe({
      
      next: (user: User) => { this.userFound = user },
      error: (err) => console.error(err)
    });
    this.userForm = this.fb.group({
      name: ['']
    })
  }


}