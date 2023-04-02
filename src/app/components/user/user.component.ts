import { Component, Input } from '@angular/core';
import { User } from 'src/app/services/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent {
  @Input() user!: User;

  constructor(private userService: UserService) {}

  onDelete(id: number) {
    this.userService.deleteUser(id);
  }
}
