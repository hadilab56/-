import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { User } from 'src/app/interfaces/user';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  constructor(private clientService: ClientService, private fb: FormBuilder) {}

  userEditForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required]],
  });

  submitDetails() {
    this.selectedUser = {
      ...this.selectedUser,
      ...this.userEditForm.value,
    };

    this.clientService.updateClient(this.selectedUser).subscribe({
      next: async (res) => {
        await this.fireSuccess();
      },
      error: async (error) => {
        console.error('something went wrong!', error);
        await this.fireFail();
      },
    });
  }
  public users: User[] = [];

  selectedUser!: User;

  @ViewChild('succesSwal')
  public readonly succesSwal!: SwalComponent;

  @ViewChild('failSwal')
  public readonly failSwal!: SwalComponent;

  ngOnInit(): void {
    this.fetchClients();
  }

  private fetchClients() {
    this.clientService.getClients().subscribe({
      next: (v) => {
        console.table(v);
        this.users = v.filter((u) => u.role !== 'admin');
        this.selectedUser = v[0];
      },
      error: (e) => {
        this.users = [];
      },
    });
  }

  public deleteUser(user: User) {
    this.clientService.deleteClient(user.id!).subscribe({
      next: async (v) => {
        await this.fireSuccess();
        this.fetchClients();
      },
      error: async (e) => {
        await this.fireFail();
      },
    });
  }

  public editUser(user: User) {
    console.log(user);
    this.selectedUser = user;
    this.userEditForm.patchValue({ ...user });
  }

  private async fireSuccess() {
    await this.succesSwal.fire();
  }

  private async fireFail() {
    await this.failSwal.fire();
  }
}
