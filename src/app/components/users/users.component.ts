import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/services/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
  public userForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[^0-9]+$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[^0-9]+$'),
    ]),
    income: new FormControl(0, [Validators.min(0.01)]),
    image: new FormControl(''),
  });

  selectedImage!: SafeUrl;
  defaultImg =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  users$ = this.userService.getUsers();

  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.status === 'VALID') {
      const image = this.selectedImage || this.defaultImg;
      const income = this.validNumber(this.userForm.value.income!);
      const score = this.calculateScore(
        this.userForm.value.firstName!,
        +income
      );

      const user = {
        ...this.userForm.value,
        image,
        income,
        score,
        id: this.userService.users.length,
      };
      this.userService.addUser(user as User);
      this.selectedImage = '';
      this.userForm.reset();
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const url: string = URL.createObjectURL(file);
    this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  validNumber(number: number) {
    if (Number.isInteger(number)) {
      return number;
    }
    return number.toFixed(2);
  }

  calculateScore(firstName: string, income: number) {
    const nameScore = firstName.split('').reduce((acc, letter) => {
      return acc + letter.toLowerCase().charCodeAt(0) - 96;
    }, 0);

    const score = nameScore + income + 1.5;

    return score;
  }

  onUser(user: User) {
    this.userForm.patchValue(user);
  }

  onSave() {
    this.userForm.patchValue(this.userForm.value);
  }
}
