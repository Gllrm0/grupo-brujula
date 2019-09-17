import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import {
  UploadFile,
  UploadXHRArgs,
  NzModalService,
  NzModalRef,
  NzMessageService
} from "ng-zorro-antd";
import { takeLast } from "rxjs/operators";
import { Reference } from "@angular/fire/storage/interfaces";
import { DetalleProducto } from "../detalle-producto";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-producto-info",
  templateUrl: "./producto-info.component.html",
  styleUrls: ["./producto-info.component.css"]
})
export class ProductoInfoComponent implements OnInit {
  @Input() producto: Producto;
  descripcion: string;
  modalRef: NzModalRef;
  detalles: string;
  refList: Reference[] = [];
  fileList: UploadFile[] = [];
  previewImage: string | undefined = "";
  previewVisible = false;
  isSubmit = false;
  @ViewChild("contentRef", { static: false }) resultTemplate: TemplateRef<any>;

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };

  constructor(
    private productoService: ProductoService,
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private afAuth: AngularFireAuth
  ) {
    this.modalService.afterAllClose.subscribe(x => {
      if (!this.isSubmit) {
        this.refList.forEach(async image => {
          await image.delete();
          this.messageService.success("Imagen eliminada!");
        });
      }
    });
  }

  ngOnInit() {}

  customRq = (item: UploadXHRArgs) => {
    return this.productoService
      .uploadImage(item)
      .pipe(takeLast(1))
      .subscribe(event => {
        event.task.then(snap => {
          item.onSuccess!(snap.task, item.file!, event);
          this.refList.push(snap.ref);
          this.messageService.success("Imagen cargada!");
        });
      });
  };

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  removeFile = async ({ uid }: UploadFile) => {
    this.fileList = [];
    await this.refList[0].delete();
    this.refList = [];
    this.messageService.success("Imagen eliminada!");
  };

  async comprar() {
    const producto: DetalleProducto = {
      descripcion: this.descripcion,
      imagen: await this.refList[0].getDownloadURL(),
      productoId: this.producto.id,
      fecha: new Date(),
      email: this.afAuth.auth.currentUser.email
    };
    await this.productoService.comprarProducto(producto);
    this.isSubmit = true;
    console.log(this.resultTemplate);

    this.modalService.success({ nzContent: this.resultTemplate });
  }
}
