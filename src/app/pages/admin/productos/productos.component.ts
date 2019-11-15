import { Component, OnInit } from "@angular/core";
import { ProductoService } from "./producto.service";
import { Observable, of } from "rxjs";
import { Producto } from "./producto";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"]
})
export class ProductosComponent implements OnInit {
  productos$: Observable<Producto[]>;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.productos$ = this.productoService.getProducts();
  }

  onEdit(item: Producto) {
    this.router.navigate(["app", "productos", item.id]);
  }
  onDelete(item) {
    this.productoService
      .deleteProductById(item)
      .then(e => this.messageService.success("Producto eliminado"));
  }
}
