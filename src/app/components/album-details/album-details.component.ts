import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Albums } from "./../../models/albums";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: "app-album-details",
  templateUrl: "./album-details.component.html",
  styleUrls: ["./album-details.component.sass"]
})
export class AlbumDetailsComponent implements OnInit {
  album: Albums;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.album = { ...this.router.getCurrentNavigation().extras.state } as any;
  }

  ngOnInit() {
    if (this.album == null || Object.entries(this.album).length === 0) {
      this.router.navigate(["/album"]);
    }
  }

  onFavorite(item: Albums): void {
    item.isFavorite = !item.isFavorite;
    this.localStorageService.storeOnLocalStorage(item);
  }
}
