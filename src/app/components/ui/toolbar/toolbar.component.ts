import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { map, filter, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  opened: boolean = true;
  title: string;
  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === "primary"),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        this.title = event.title;
      });
  }
  toggle() {
    this.opened = !this.opened;
    this.toggleSidenav.emit(this.opened);
  }
}
