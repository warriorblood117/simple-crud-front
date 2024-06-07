import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users!: User[];
  isModalOpen = false;
  selectedUser?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.get().subscribe({
      next: (listUsers: User[]) => this.users = listUsers,
      error: (err) => console.error(err)
    });
  }

  showDetails(user: User) {
    this.selectedUser = user;
    this.openModal();
  }

  openModal() {
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.selectedUser = undefined;
  }
}
