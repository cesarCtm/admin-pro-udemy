import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor( public http: HttpClient, public _usuarioService: UsuarioService ) { }


  cargarMedicos(){
    let url = URL_SERVICIOS + '/medicos';
    return this.http.get( url ).pipe(
      map( (resp : any ) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  buscarMedico( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map(
      (resp: any)=> resp.medicos
    ));
  }

  borrarMedico( id: string ){
    let url = URL_SERVICIOS+ '/medicos/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url ).pipe(
      map( (resp: any) => {
        Swal.fire('Medico eliminado', 'medico eliminado satisfactoiramente', 'success');
        return resp;
      })
    );

  }

  cargarMedico( id: string ){
    let url = URL_SERVICIOS + '/medicos/' + id;
    return this.http.get( url )
    .pipe(
      map( (resp: any) => resp.medico)
    );
  }

  guardarMedico( medico: Medico ){

    let url = URL_SERVICIOS + '/medicos/';
    // actualizando
    if( medico._id ){
      url += medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico)
      .pipe(
        map( (resp: any) => {
          Swal.fire('Medico actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    }
    // creando
    else{
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, medico )
    .pipe(
      map( (resp: any) => {
        Swal.fire('Medico creado', medico.nombre, 'success');
        return resp.medico;
      })
    );
    
    }
  }
}
