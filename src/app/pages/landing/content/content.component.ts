import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../../admin/productos/producto";
import { ProductoService } from "../../admin/productos/producto.service";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit {

  productos$: Observable<Producto[]>;
  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productos$ = this.productoService.getProducts();
  }
}
