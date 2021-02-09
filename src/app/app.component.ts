import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from "./providers/auth.service.ts.service";
import { UserService } from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Stadia Hunters';
  user: any

  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { 
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
   }

  ngOnInit(): void {
    this.auth.loggedUser.subscribe(user => {
      this.user = user
    })
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
  }

  redirectUser(){
    this.userService.changeUser(this.user)
    this.router.navigate([`/user/${this.user.username.replace('#','-')}`]);
  }
}
