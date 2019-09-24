import { Component, OnInit } from "@angular/core";
import { GaleriaService, Imagen } from "../galeria-upload/galeria.service";
import { Observable } from "rxjs";
import { ProductoService } from "../productos/producto.service";
import { Producto } from "../productos/producto";
import { take } from "rxjs/operators";
import { UsuarioService } from "../usuarios/usuario.service";
import { User } from "firebase";

@Component({
  selector: "app-galeria-admin",
  templateUrl: "./galeria-admin.component.html",
  styleUrls: ["./galeria-admin.component.css"]
})
export class GaleriaAdminComponent implements OnInit {
  images: Observable<Imagen[]>;
  products: Producto[];

  constructor(
    private galeriaService: GaleriaService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.images = this.galeriaService.getImages().pipe(take(1));
    // this.images = this.galeriaService.getImages();
    this.productoService
      .getProducts()
      .subscribe(products => (this.products = products));
  }
}
