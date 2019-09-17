import { Component } from "@angular/core";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { UsuarioService } from "../../admin/usuarios/usuario.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",

  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  validateForm: FormGroup;

  async submitForm(value: any) {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    await this.usuarioService.addUser(value);
    this.router.navigateByUrl("/");
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls.confirm.updateValueAndValidity()
    );
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      const user = this.usuarioService
        .getUserByUsername(control.value)
        .then(user => {
          console.log(user);
          if (user) {
            observer.next({ error: true, duplicated: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        });
    });

  emailAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.usuarioService.getUserByEmail(control.value).then(user => {
        if (user) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      username: ["", [Validators.required], [this.userNameAsyncValidator]],
      email: [
        "",
        [Validators.email, Validators.required],
        [this.emailAsyncValidator]
      ],
      password: ["", [Validators.required]],
      confirm: ["", [this.confirmValidator]],
      nombres: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      ciudad: ["", [Validators.required]],
      direccion: ["", [Validators.required]]
    });
  }
}
