import { Component, Input } from '@angular/core';
import { User } from 'src/app/services/model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent {
  @Input() user!: User;
}
