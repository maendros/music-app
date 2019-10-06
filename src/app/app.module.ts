import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AlbumsComponent } from "./components/albums/albums.component";
import { AlbumDetailsComponent } from "./components/album-details/album-details.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AlbumService } from "src/app/services/album.service";
import { HeaderComponent } from "./components/header/header.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDirectiveDirective } from './directives/custom-directive.directive';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    CustomDirectiveDirective,
    

  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StorageServiceModule,
    
  ],

  entryComponents: [AlbumsComponent],
  providers: [AlbumService,LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
