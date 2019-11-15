import { Component, OnInit, OnChanges } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import { Observable, empty } from "rxjs";
import { delay, tap, takeLast, switchMap } from "rxjs/operators";
import { NzMessageService, UploadXHRArgs } from "ng-zorro-antd";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-producto-form",
  templateUrl: "./producto-form.component.html",

  styleUrls: ["./producto-form.component.css"]
})
export class ProductoFormComponent implements OnInit {
  validateForm: FormGroup;
  producto: Producto;
  productId: string;
  loading: boolean = true;
  pro: Observable<Producto>;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.productId) {
      this.productoService
        .updateProduct(this.productId, this.validateForm.value)
        .then(res => {
          this.message.success("Producto actualizado");
        });
    } else {
      this.productoService.addProduct(this.validateForm.value).then(() => {
        this.router.navigateByUrl("/app/productos");
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private message: NzMessageService,
    private storage: AngularFireStorage,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.pro = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get("id");
        if (id) return this.productoService.getProductById(id);
        return empty();
      }),
      tap(producto => {
        this.validateForm.setValue(producto);
      })
    );
    //     this.productId = this.route.snapshot.paramMap.get("id");

    // this.productoService.getProductById(this.productId).subscribe(producto => {
    //   this.producto = producto;
    //   this.loading = false;
    // });

    this.validateForm = this.fb.group({
      nombre: [null, [Validators.minLength(3), Validators.required]],
      descripcion: [null, [Validators.required]],
      foto: [null, [Validators.required]]
    });
  }

  customRq = (item: UploadXHRArgs) => {
    return this.productoService
      .uploadImage(item)
      .pipe(takeLast(1))
      .subscribe(event => {
        event.task.then(async snap => {
          item.onSuccess!(snap.task, item.file!, event);
          this.messageService.success("Imagen cargada!");
          const url = await snap.ref.getDownloadURL();
          this.validateForm.get("foto").setValue(url);
        });
      });
  };
}
