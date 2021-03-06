
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
  onLogout() {
    this.onClose();
    this.authService.logout();
  }

}
