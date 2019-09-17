import { Component, OnInit } from "@angular/core";
import { ProductoService } from "./producto.service";
import { Observable, of } from "rxjs";
import { Producto } from "./producto";
import { map } from "rxjs/operators";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"]
})
export class ProductosComponent implements OnInit {
  productos$: Observable<Producto[]>;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productos$ = this.productoService.getProducts();
  }
}
