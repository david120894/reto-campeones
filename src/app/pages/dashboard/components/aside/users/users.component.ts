import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../../core/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const NG_MODULES = [CommonModule, FormsModule];

@Component({
  selector: 'app-users',
  imports: [...NG_MODULES],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  showDeleteModal = false;
  showRoleConfirmModal = false;
  newRole: 'user' | 'admin' | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages: number = 0;
  searchQuery: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.updateTotalPages();
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  onRoleChange(user: User, newRole: 'user' | 'admin') {
    if (newRole === 'admin') {
      this.selectedUser = user;
      this.newRole = newRole;
      this.showRoleConfirmModal = true;
    } else {
      this.updateRole(user, newRole);
    }
  }

  confirmRoleChange() {
    if (this.selectedUser && this.newRole) {
      this.updateRole(this.selectedUser, this.newRole);
      this.showRoleConfirmModal = false;
      this.selectedUser = null;
      this.newRole = null;
    }
  }

  updateRole(user: User, newRole: 'user' | 'admin') {
    const updatedUser = { ...user, role: newRole };
    this.userService.updateUser(user.id, { role: newRole }).pipe(
      switchMap(() => this.userService.getUsers())
    ).subscribe({
      next: (users) => {
        this.users = users;
        this.updateTotalPages(); // Actualizar total de páginas después de actualizar
      },
      error: (err) => console.error('Error updating role:', err)
    });
  }

  deleteUser(id: number) {
    this.selectedUser = this.users.find(user => user.id === id) || null;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedUser?.id) {
      this.userService.deleteUser(this.selectedUser.id).pipe(
        switchMap(() => this.userService.getUsers())
      ).subscribe({
        next: (users) => {
          this.users = users;
          this.showDeleteModal = false;
          this.selectedUser = null;
          this.updateTotalPages(); // Actualizar total de páginas después de eliminar
        },
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }

  closeModal() {
    this.showDeleteModal = false;
    this.showRoleConfirmModal = false;
    this.selectedUser = null;
    this.newRole = null;
  }

  get filteredUsers() {
    if (!this.searchQuery) {
      return this.users;
    }
    const query = this.searchQuery.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
  }

  get paginatedUsers() {
    const filtered = this.filteredUsers;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  private updateTotalPages() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    } else if (this.totalPages === 0) {
      this.currentPage = 1;
    }
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updateTotalPages();
  }
}