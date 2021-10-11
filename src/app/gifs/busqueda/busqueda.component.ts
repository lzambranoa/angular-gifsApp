import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') textBuscar!:ElementRef<HTMLInputElement>;

  // Inyectamos el service para tener acceso a todos sus metodos
  constructor( private gifsService: GifsService ){}

  buscar(){
    const valor = this.textBuscar.nativeElement.value;

    if( valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);
    this.textBuscar.nativeElement.value = '';
  }

}
