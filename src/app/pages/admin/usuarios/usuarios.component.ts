import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "./usuario.service";
import { Observable } from "rxjs";
import { Usuario } from "./usuario";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  data: Observable<Usuario[]>;

  constructor(
    private usuarioService: UsuarioService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit() {
    this.data = this.usuarioService.list();
    console.log(this.data);
  }
  cambiarEstado(data: any) {
    this.usuarioService.cambiarEstado(data);
  }
  confirm(data) {
    console.log("do it", data);
    this.nzMessageService.info("Eliminado!");
    this.usuarioService.cambiarEstado(data);
  }
  cancel() {}
}
