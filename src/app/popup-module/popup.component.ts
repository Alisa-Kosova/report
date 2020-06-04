import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { PopupDirective } from "./popup.directive";
import { PopupService } from "../services/popup.service";

@Component({
  selector: "popup",
  template: `<ng-template ad-host></ng-template>`
})
export class PopupComponent implements OnInit, OnDestroy {
  private unSubscription: Subscription;
  private viewContainerRef;

  @Output() updateEmployees = new EventEmitter();
  @ViewChild(PopupDirective, { static: true }) adHost: PopupDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private popupService: PopupService, ) { }

  ngOnInit() {
   this.viewContainerRef = this.adHost.viewContainerRef;
    this.unSubscription = this.popupService.popupSubject$.subscribe(data => {
      if (data && data.popupEvent === "open") {
        this.open(data);
      } else if (data && data.popupEvent === "close") {
        this.close();
      }
    });
  }

  open(data) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      data.component
    );
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(componentFactory);
  }

  close() {
    this.viewContainerRef.detach(0);
    this.updateEmployees.emit();
  }

  ngOnDestroy() {
    this.unSubscription.unsubscribe();
  }
}
