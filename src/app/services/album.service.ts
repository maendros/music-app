import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { map, tap, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AlbumService {
  //private albumUrl = "https://api.music.apple.com/v1/catalog/us/albums/310730204"
  private albumUrl = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8"
    })
  };

  constructor(private http: HttpClient) {}

  getAlbumResults(): Observable<any> {
    return this.http.get<any>(this.albumUrl).pipe(
      tap(data => console.log("All: " + data)),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
