import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import { Observable } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { NzMessageService } from "ng-zorro-antd";
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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.productoService
      .updateProduct(this.productId, this.validateForm.value)
      .then(res => {
        console.log("hizo", res);
        this.message.success("Producto actualizado");
      });
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private message: NzMessageService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id");

    this.productoService.getProductById(this.productId).subscribe(producto => {
      this.producto = producto;
      this.loading = false;
    });

    this.validateForm = this.fb.group({
      nombre: [null, [Validators.minLength(3), Validators.required]],
      descripcion: [null, [Validators.required]],
      foto: [null, [Validators.required]]
    });
  }
}
