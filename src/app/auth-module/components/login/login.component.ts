import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import {
  AuthService,
  UserService,
  RouterService
} from 'app/core';
import { User } from 'app/shared/model';
import { MenuItem } from 'app/shared/viewModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IObjectMap } from 'app/shared/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  private menuItem: MenuItem = {
    'title': '',
    'showAll': false,
    'backButtonEnabled': false,
    'searchEnabled': false,
    'searchActive': false,
    'submenuItems': []
  };

  public loginError = '';

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private routerService: RouterService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.routerService.setMainMenuItem(this.menuItem);
  }

  ngAfterViewInit() {
    // listen for login and auto continue to dashboard
    this.authService.authState$.take(1).subscribe((auth) => {
      if (auth) {
         this.ngZone.run(() => this.gotoDashboard());
      }
    });
  }

  async login() {
    const authState: any = await this.authService.loginSocial('google');
    const authProfile: any = authState.additionalUserInfo.profile;
    const user: User = await this.userService.getUserByEmail(authProfile.email);

    if (!user) {
      this.loginError = 'User does not exist';
    } else {
      this.userService.updateUser(Object.assign({}, user, {
        fullname: authProfile.name,
        picture: authProfile.picture,
        email: authProfile.email,
        active: true,
        uid: authState.user.uid
      }));

      this.setCookiesInLocalstorage(user);
      this.gotoDashboard();
    }
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }

  setCookiesInLocalstorage(user: User) {
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_email', user.email);
  }
}
