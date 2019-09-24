import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IconsProviderModule } from "./icons-provider.module";
import {
  NgZorroAntdModule,
  NZ_I18N,
  es_ES,
  NZ_MESSAGE_CONFIG
} from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import es from "@angular/common/locales/es";
import { LightboxModule } from "ngx-lightbox";

import { HomeComponent } from "./home.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { LoginComponent } from "./pages/landing/login/login.component";
import { ContentComponent } from "./pages/landing/content/content.component";
import { RegisterComponent } from "./pages/landing/register/register.component";
import { ProductoViewComponent } from "./pages/admin/productos/producto-view/producto-view.component";
import { UsuariosComponent } from "./pages/admin/usuarios/usuarios.component";
import { ProductosComponent } from "./pages/admin/productos/productos.component";
import { ProductoFormComponent } from "./pages/admin/productos/producto-form/producto-form.component";
import { ProductoInfoComponent } from "./pages/admin/productos/producto-info/producto-info.component";
import { GaleriaComponent } from "./pages/landing/galeria/galeria.component";
import { QuienesSomosComponent } from "./pages/landing/quienes-somos/quienes-somos.component";
import { MensajesComponent } from './pages/admin/mensajes/mensajes.component';
import { StringColorPipe } from './pages/admin/string-color.pipe';
import { GaleriaUploadComponent } from './pages/admin/galeria-upload/galeria-upload.component';
import { DropzoneDirective } from './pages/admin/galeria-upload/dropzone.directive';
import { UploadTaskComponent } from './pages/admin/galeria-upload/upload-task/upload-task.component';
import { SizePipe } from './pages/admin/galeria-upload/size.pipe';
import { GaleriaAdminComponent } from './pages/admin/galeria-admin/galeria-admin.component';
import { CardImgComponent } from './pages/admin/galeria-admin/card-img/card-img.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    ContentComponent,
    RegisterComponent,
    ProductoViewComponent,
    UsuariosComponent,
    ProductosComponent,
    ProductoFormComponent,
    ProductoInfoComponent,
    GaleriaComponent,
    QuienesSomosComponent,
    MensajesComponent,
    StringColorPipe,
    GaleriaUploadComponent,
    DropzoneDirective,
    UploadTaskComponent,
    SizePipe,
    GaleriaAdminComponent,
    CardImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    LightboxModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: StorageBucket, useValue: "gs://grupo-brujula.appspot.com" },
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzTop: 60 } }
  ],
  bootstrap: [HomeComponent],
  entryComponents: [ProductoInfoComponent]
})
export class AppModule {}
