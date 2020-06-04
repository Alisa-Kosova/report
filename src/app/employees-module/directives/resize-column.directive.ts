import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizeColumn]'
})
export class ResizeColumnDirective {

  @Input('appResizeColumn') headName;

  private start: any;
  private movie: boolean = false;
  private startX: number;
  private startWidth: number;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mousedown', ['$event']) onMousedown($event) {
    this.start = event.target;
    this.movie = true;
    this.startX = $event.x;
    this.startWidth = this.elementRef.nativeElement.offsetParent.clientWidth;
    this.changeWidth();
  }

  mouseMove() {
    this.renderer.listen('document', 'mousemove', (event) => {
      if (this.movie) {
        let width = this.startWidth - (event.pageX - this.startX);
        this.elementRef.nativeElement.offsetParent.width = width;
      }
    });
  }

  mouseUp() {
    this.renderer.listen('document', 'mouseup', (event) => {
      if (this.movie) {
        this.movie = false;
      }
    });
  }

  changeWidth() {
    this.mouseMove();
    this.mouseUp();
  };
}
