import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      posts: this.fb.array([])
    });
  }

  get posts(): FormArray {
    return this.userForm.get('posts') as FormArray;
  }

  addPost() {
    const post = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.posts.push(post);
  }

  removePost(index: number) {
    this.posts.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.post(this.userForm.value).subscribe({
        next: (user: User) => { console.log(JSON.stringify(user)) },
        error: (err) => console.error(err)

      });
    } else {
      console.log('Form is invalid');
    }
  }
}
