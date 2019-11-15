import { Component, OnInit, OnChanges, OnDestroy } from "@angular/core";
import { GaleriaService, Imagen } from "../galeria-upload/galeria.service";
import { Observable, Subscription } from "rxjs";
import { ProductoService } from "../productos/producto.service";
import { Producto } from "../productos/producto";
import { take } from "rxjs/operators";
import { UsuarioService } from "../usuarios/usuario.service";
import { User } from "firebase";
import { Lightbox, IAlbum } from "ngx-lightbox";

@Component({
  selector: "app-galeria-admin",
  templateUrl: "./galeria-admin.component.html",
  styleUrls: ["./galeria-admin.component.css"]
})
export class GaleriaAdminComponent implements OnInit, OnDestroy {
  images: Observable<Imagen[]>;
  products: Observable<Producto[]>;
  albums: IAlbum[];
  albumsSubcription: Subscription;

  constructor(
    private galeriaService: GaleriaService,
    private productoService: ProductoService,
    private lightbox: Lightbox
  ) {
    this.galeriaService.getAlbums().subscribe(albums => (this.albums = albums));
  }

  async ngOnInit() {
    this.images = this.galeriaService.getImages().pipe(take(1));
    // this.images = this.galeriaService.getImages();
    this.products = this.productoService.getProducts();
  }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.albums, index);
  }

  ngOnDestroy() {
    //  this.albumsSubcription.unsubscribe();
  }
}
