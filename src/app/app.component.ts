import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects;
      this.showHeader$.next(!currentUrl.includes('/login'));
    });
  }
}
