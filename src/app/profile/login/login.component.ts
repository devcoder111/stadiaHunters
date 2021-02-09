import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { FormBuilder, FormControl } from '@angular/forms';
import { Validators} from '@angular/forms';

import { AuthService } from "../../providers/auth.service.ts.service";
import { UserService } from "../../services/user/user.service";
import { SeoService } from 'src/app/seo/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  profileForm = this.fb.group({
    name: new FormControl('', [ Validators.required]),
    tag: new FormControl('', [Validators.required]),
    link: [''],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
    private seo : SeoService
    ) { }

  user: any

  ngOnInit(): void {
    this.seo.generateTags({title: 'Login | Stadia Hunters'})
    this.authService.loggedUser.subscribe(user => {
      if(user && (!this.user || user._id != this.user._id)){
        this.user = user
        this.userService.changeUser(user)
        this.location.back()
      }
    })
  }

  register(){
    const name = this.profileForm.value.name as string
    const tag  = this.profileForm.value.tag  as string
    const url = this.profileForm.value.link.split('profile/')
    let stadiaId = ""
    if(url.length > 1) {
      stadiaId = url[1]
    }
    let user = {
      stadiaId: stadiaId,
      username: this.userService.buildUsername(name, tag).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    this.authService.googleRegister(user)
  }

  signIn(){
    this.authService.googleSignIn()
  }
}
