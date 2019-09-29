import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { Imagen, GaleriaService } from "../../galeria-upload/galeria.service";
import { Producto } from "../../productos/producto";
import { ProductoService } from "../../productos/producto.service";
import { Observable } from "rxjs";
import { NzMessageService } from "ng-zorro-antd";
import { UsuarioService } from "../../usuarios/usuario.service";
import { Usuario } from "../../usuarios/usuario";
import { map, tap, shareReplay, share } from "rxjs/operators";
import { IAlbum } from "ngx-lightbox";

@Component({
  selector: "card-img",
  templateUrl: "./card-img.component.html",
  styleUrls: ["./card-img.component.css"]
})
export class CardImgComponent implements OnInit, OnChanges {
  @Input() img: Imagen;
  @Input() tags: Producto[];
  selectedTags: string[] = [];
  products: Observable<Producto[]>;
  description: string;
  showCard: boolean;
  user$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  tags$: Observable<Producto[]>;
  @Output() open = new EventEmitter();
  albums$: Observable<IAlbum[]>;

  constructor(
    private productoService: ProductoService,
    private GaleriaService: GaleriaService,
    private msgService: NzMessageService,
    private userService: UsuarioService
  ) {}

  ngOnInit() {
    this.products = this.productoService.getProducts();
    this.selectedTags = this.img.tags || [];
    this.user$ = this.userService.currentUser.pipe(
      map(user => (user && user.isAdmin ? user.isAdmin : false)),
      tap(user => console.count("before shared")),
      shareReplay(5)
    );
  }

  ngOnChanges(e) {
    this.tags$ = this.userService.currentUser.pipe(
      map(user => {
        return user && user.isAdmin
          ? [...this.tags]
          : [...this.tags.filter(tag => this.img.tags.includes(tag.id))];
      })
    );
    this.showCard = this.img.show;
  }

  async handleChange(checked: boolean, tag: string): Promise<void> {
    console.log("init", [...this.selectedTags]);

    if (checked) {
      this.selectedTags.push(tag);
      console.log("yes", [...this.selectedTags]);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
      console.log("no", [...this.selectedTags]);
    }
    await this.GaleriaService.update(this.img.id, {
      tags: this.selectedTags
    });
  }
  async updateDescription() {
    await this.GaleriaService.update(this.img.id, {
      description: this.img.description
    });
  }

  async hide() {
    this.img.show = false;
    await this.GaleriaService.update(this.img.id, { show: false });
  }

  async show() {
    this.img.show = true;
    await this.GaleriaService.update(this.img.id, { show: true });
  }

  delete() {
    this.GaleriaService.delete(this.img).then(imgDelete => {
      this.msgService.success("Imagen eliminada");
      this.showCard = false;
    });
  }
}
