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
  userPosts: Post[] = [];
  userFound: User = {} as User;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.userService.findUserById(this.userId).subscribe({
      next: (user: User) => {
        this.userFound = user;
        this.initializeForm();
      },
      error: (err) => console.error(err)
    });
  }

  initializeForm() {
    this.userForm = this.fb.group({
      id: this.userFound.id,
      name: [this.userFound.name, Validators.required],
      posts: this.fb.array(this.userFound.posts ? this.userFound.posts.map(post => this.createPostGroup(post)) : [])
    });
  }

  createPostGroup(post: Post): FormGroup {
    // Si el id es null, asignar -1 como valor predeterminado
    const postId = post.id != null ? post.id : -1;

    return this.fb.group({
      id: [postId], // El ID puede ser -1 si es nuevo
      title: [post.title, Validators.required],
      content: [post.content, Validators.required]
    });
  }


  get posts(): FormArray {
    return this.userForm.get('posts') as FormArray;
  }

  addPost() {
    const newPostFormGroup = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.posts.push(newPostFormGroup);
  }



  removePost(index: number): void {
    const postFormGroup = this.posts.at(index) as FormGroup | null;

    if (postFormGroup) {
      const postId = postFormGroup.get('id')?.value;

      if (postId != null && postId !== -1) {
        this.userService.deletePost(postId).subscribe({
          next: () => {
            // Actualiza el formulario después de eliminar el post
            this.updateFormAfterPostRemoval(index);
          },
          error: (err) => {
            console.error('Error deleting post', err);
            // Realiza alguna acción adicional en caso de error, si es necesario
          },
          complete: () => {
            // Esta función se ejecutará inmediatamente después de que la subscripción se complete
            console.log('Subscripción completada');
          }
        });
      } else {
        // Si el post no tiene un ID o tiene un ID igual a -1, simplemente lo eliminas del FormArray
        this.posts.removeAt(index);
      }
    }
  }


  updateFormAfterPostRemoval(index: number): void {
    // Volver a cargar los datos del usuario después de eliminar el post
    this.userService.findUserById(this.userId).subscribe({
      next: (user: User) => {
        this.userFound = user;
        // Volver a inicializar el formulario con los datos actualizados del usuario
        this.initializeForm();
      },
      error: (err) => console.error(err)
    });
  }





  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.value;
      this.userService.update(this.userId, updatedUser).subscribe({
        next: response => {
          console.log('User updated successfully', response);
          // Volver a cargar los datos del usuario después de la actualización
          this.userService.findUserById(this.userId).subscribe({
            next: (user: User) => {
              this.userFound = user;
              // Volver a inicializar el formulario con los datos actualizados del usuario
              this.initializeForm();
            },
            error: (err) => console.error(err)
          });
        },
        error: err => {
          console.error('Error updating user', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
