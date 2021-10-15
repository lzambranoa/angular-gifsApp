import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private YOUR_API_KEY = environment.apiKey;

  private _historial: string[] = [];

  //TODO: cambiar any por su tipado
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){}
  
  buscarGifs( query:string ){

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.YOUR_API_KEY}&q=${query}&limit=10`)
        .subscribe((resp) => {
          console.log(resp.data);
          this.resultados = resp.data;
        })
  }

}
