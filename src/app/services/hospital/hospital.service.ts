import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor( public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
    .pipe(map(  (resp: any)=> {
      this.totalHospitales = resp.total; 
      return resp.hospitales;
    }));
  }
  obtenerHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
    .pipe(map(  (resp : any ) => resp.hospital ));
  }
  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
    .pipe(map(  () => Swal.fire('Hospital', 'Eliminado correctamente', 'success') ));

  }


  buscarHospital( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map(
      (resp: any)=> resp.hospitales
    ));
  }
    crearHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre, userId : this._usuarioService.usuario._id })
    .pipe(map(  (resp: any) => resp.hospitales ));
  }


  actualizarHospital( hospital : Hospital ){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital )
    .pipe(map(
      (resp: any)=> {
        Swal.fire('Hospital actualizado', hospital.nombre + ' fue actualizado', 'success');
        return resp.hospitales;
      }
    ));
  }
}
