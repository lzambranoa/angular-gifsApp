import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private YOUR_API_KEY = environment.apiKey;
  private servicioUrl = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  //TODO: cambiar any por su tipado
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    // Forma 1 de realizar la consulta
    // El simbolo (!) valida que el get item me puede retornar un null
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }

    // Forma 2 de realizar el consumo de la información
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  
  buscarGifs( query:string ){

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      //Grabacion de la informacion del historial de busqueda del localStorage
      // Se usa el JSON.stringify ya que el valor a pasar debe ser un string
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
        .set('api_key', this.YOUR_API_KEY)
        .set('limit', '10')
        .set('query', query)

    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
        })
  }

}
