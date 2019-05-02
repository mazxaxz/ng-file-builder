import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private _childComponentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private ref: ApplicationRef,
    private injector: Injector) { }

  appendComponentTo(parentId: string, child: any) {
    this._childComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(child)
      .create(this.injector);

    this.ref.attachView(this._childComponentRef.hostView);
    const childDomElem = (this._childComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.getElementById(parentId).appendChild(childDomElem);
  }

  removeComponent() {
    this.ref.detachView(this._childComponentRef.hostView);
    this._childComponentRef.destroy();
  }
}
