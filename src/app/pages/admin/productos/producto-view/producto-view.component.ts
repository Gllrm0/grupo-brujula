import { Component, OnInit, Input } from "@angular/core";
import { Producto } from "../producto";
import { AngularFireAuth } from "@angular/fire/auth";
import { NzModalService } from "ng-zorro-antd";
import { ProductoInfoComponent } from "../producto-info/producto-info.component";

@Component({
  selector: "app-producto-view",
  templateUrl: "./producto-view.component.html",
  styleUrls: ["./producto-view.component.css"]
})
export class ProductoViewComponent implements OnInit {
  @Input() producto: Producto;
  constructor(
    private afAuth: AngularFireAuth,
    private modalService: NzModalService
  ) {}
  actionsAdmin = ["actionSetting", "actionEdit", "actionEllipsis"];
  ngOnInit() {}

  showModal() {
    this.modalService.create({
      nzTitle: "Detalles del producto",
      nzContent: ProductoInfoComponent,
      nzComponentParams: { producto: this.producto },
      nzWidth: 900
    });
  }
}
