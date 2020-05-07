import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-model-upload',
  templateUrl: './model-upload.component.html',
  styles: []
})
export class ModelUploadComponent implements OnInit {
  
  imagenSubir: File;
  imagenTemporal: string;
  
  constructor( public _subirArchivoService: SubirArchivoService, public _modalUploadService : ModalUploadService  ) { 
    
  }

  ngOnInit(): void {
  }

  seleccionImage( archivo: File ){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
    if(  archivo.type.indexOf('image') < 0){
      Swal.fire('Solo imagenes', 'el archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result as string;

  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
    .then( resp => {
      this._modalUploadService.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch(err=>{
      console.log('error en la carga...', err);
    });
  }
  cerrarModal(){
    this.imagenTemporal = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal;
  }

}
