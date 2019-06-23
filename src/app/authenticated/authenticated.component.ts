import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  user;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  /**
   * Ng Onit
   * - On page load , Will get specific user details from localstorage.
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user = this.usersService.getUserData(params.id);
  });
  }

}
