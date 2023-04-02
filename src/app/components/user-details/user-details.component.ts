import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/services/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
})
export class UserDetailsComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.user = this.userService.getUser(id) as User;
  }

  onBack() {
    this.location.back();
  }
}
