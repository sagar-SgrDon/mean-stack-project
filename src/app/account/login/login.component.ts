import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  datasaved = false;
  message!: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.setFormState();
  }

  setFormState() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.accountService.login(this.form.value).subscribe((response) => {
      const res = JSON.stringify(response);
      console.log(response);
      this.datasaved = true;
      const parsedRes = JSON.parse(res);
      this.message = parsedRes.message;
      if (parsedRes.userId) {
        this.router.navigate(['']);
      }
    });
  }
}
