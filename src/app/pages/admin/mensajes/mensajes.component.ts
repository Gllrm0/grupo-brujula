// tslint:disable:no-any
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { MensajesService } from "./mensajes.service";
import { Mensaje } from "./mensaje";
import { Producto } from "../productos/producto";
import { UsuarioService } from "../usuarios/usuario.service";
import { Usuario } from "../usuarios/usuario";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

@Component({
  selector: "app-mensajes",
  templateUrl: "./mensajes.component.html",
  styleUrls: ["./mensajes.component.css"]
})
export class MensajesComponent implements OnInit {
  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean }> = [];
  messagesLimit: number = 4;
  message: any;
  user: any;

  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private mensajesService: MensajesService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.list = this.data.concat(
      [...Array(10)].fill({}).map(() => ({ loading: true }))
    );
    this.mensajesService.getMessages().then(async mensajes => {
      for (let mensaje of mensajes) {
        const producto = await mensaje.productoId.get();
        mensaje.producto = producto.data() as Producto;
      }

      this.data = mensajes;
      this.list = mensajes as any;
      this.initLoading = false;
      console.log(mensajes);
    });
  }

  getData(callback: (res: any) => void): void {
    this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  async showMessage(item) {
    console.log("load", item);
    this.user = await this.usuarioService.getUserByEmail(item.email);
    this.mensajesService.markAsRead(item.id);
    this.message = item;
    item.isRead = true;
  }

  markUnmarkAsRead(item: any) {
    const newStatus = !item.isRead || false;
    item.isRead = newStatus;
    // console.log("e", id);
    this.mensajesService.markAsRead(item.id, newStatus).then(res => {
      this.msg.success("Hecho!");
    });
  }

  async delete(id) {
    const idx = this.data.findIndex(i => i.id === id);
    this.list.splice(idx, 1);

    await this.mensajesService.deleteMessage(id);
    this.msg.success("Mensaje eliminado!");
  }
}
