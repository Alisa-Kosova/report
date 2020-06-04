import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class PopupService {
  private popupSubject = new Subject<{
    popupEvent: string;
    component?: any;
    data?: {};
  }>();

  public popupSubject$ = this.popupSubject.asObservable();

  open(component: any, data?: any) {
    this.popupSubject.next({
      popupEvent: "open",
      component: component,
      data: data
    });
  }

  close() {
    this.popupSubject.next({ popupEvent: "close" });
  }
}
