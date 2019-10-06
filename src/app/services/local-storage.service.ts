import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Albums } from "./../models/albums";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  readonly STORAGE_KEY = "local_albumList";
  albumList: Albums[] = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  public storeOnLocalStorage(album: Albums): void {
    const currentAlbumList = this.storage.get(this.STORAGE_KEY) || [];
    const foundId = currentAlbumList.findIndex(x => x.id === album.id);
    if (foundId !== -1) {
      currentAlbumList.splice(foundId, 1);
    } else {
      currentAlbumList.push(album);
    }

    this.storage.set(this.STORAGE_KEY, currentAlbumList);

  }
  public findAlbumOnLocalStorage(id:string):boolean{
    return this.storage.get(this.STORAGE_KEY).some(x => {return x.id === id});
  }
  public loadFavorites():Array<any>{
    return [...this.storage.get(this.STORAGE_KEY)] || null;
  }
}
