import { Component, OnInit } from "@angular/core";
import { AlbumService } from "src/app/services/album.service";
import { Albums } from "./../../models/albums";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: "app-albums",
  templateUrl: "./albums.component.html",
  styleUrls: ["./albums.component.sass"]
})
export class AlbumsComponent implements OnInit {
  /** lists that gets rendered */
  albums: Albums[] = [];
  /** lists to search Results */
  cachedAlbumsResults: Albums[] = [];
  searchForm: FormGroup;
  errorMessage: any;
  isLoading: boolean;
  areFavorites: boolean;
  showErrorMessage = false;
  showZeroFavorites: boolean;
  constructor(
    private albumService: AlbumService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    this.areFavorites = this.router.getCurrentNavigation().extras.state as any;
  }

  ngOnInit() {
    this.isLoading = true;
    this.buildFormGroup();
    this.activatedRoute.data.subscribe(el => {
      this.areFavorites = el.areFavorites;
    });
    if (this.areFavorites) {
      this.loadFavoritesResults();
    } else {
      this.loadResults();
    }
  }

  private buildFormGroup(): void {
    this.searchForm = new FormGroup({
      search: new FormControl("")
    });
  }
  loadFavoritesResults(): void {
    this.albums = this.localStorageService.loadFavorites();
    this.cachedAlbumsResults = [...this.albums];
    this.isLoading = false;
    this.showZeroFavorites = this.albums.length === 0;
  }
  loadResults(): void {
    this.albumService.getAlbumResults().subscribe(
      data => {
        data.feed.entry.forEach(el => {
          let album = new Albums();
          album.category = el.category.attributes.label;
          album.id = el.id.attributes["im:id"];
          album.images = el["im:image"][2].label;
          album.artist = el["im:artist"].label;
          album.itemCount = el["im:itemCount"].label;
          album.name = el["im:name"].label;
          album.price = el["im:price"].label;
          album.title = el.title.label;
          album.rights = el.rights.label;
          album.link = el.link.attributes.href;
          album.releaseDate = el["im:releaseDate"].attributes.label;
          album.isFavorite = this.localStorageService.findAlbumOnLocalStorage(
            album.id
          );
          this.albums.push(album);
        });
        this.cachedAlbumsResults = [...this.albums];
        this.isLoading = false;
      },
      error => (this.errorMessage = <any>error)
    );
  }
  searchAlbum() {
    console.log(this.searchForm.valid);
    if (this.searchForm.valid) {
      this.albums =
        this.searchForm.value["search"].length === 1
          ? this.cachedAlbumsResults
          : this.findStringInArray(
              this.searchForm.value["search"],
              this.cachedAlbumsResults
            );
    }
  }

  findStringInArray(val: string, table: Albums[]): Albums[] {
    return (
      table.filter(el => {
        return el.title.toLowerCase().includes(val.toLowerCase());
      }) || []
    );
  }

  navigateToAlbumDetails(album: Albums): void {
    this.router.navigate(["/details"], { state: { ...album } });
  }

  onFavorite(item: Albums): void {
    item.isFavorite = !item.isFavorite;
    if(this.areFavorites){
      const foundId = this.albums.findIndex(x => x.id === item.id);
      this.albums.splice(foundId,1)
      this.showZeroFavorites = this.albums.length === 0;
    }
    this.localStorageService.storeOnLocalStorage(item);
  }
}
