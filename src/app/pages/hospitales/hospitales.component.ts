import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/model-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) {

   }

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUploadService.notificacion
    .subscribe( () => this.cargarHospitales() );
  }

  crearHospital(){

    Swal.fire({
      title: 'Crear nuevo Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: 'info',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then( (resp) => {
      if(!resp ||  resp.value.length === 0){
        return;
      }
      this._hospitalService.crearHospital(resp.value)
      .subscribe( () => {
        Swal.fire('Nuevo hospital creado', 'hospital: ' + resp.value + ' creado con exito', 'success');
        this.cargarHospitales();
      });
    });

  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales()
    .subscribe( hospitales => this.hospitales = hospitales );
  }
  
  guardarHospital(hospital : Hospital){
    this._hospitalService.actualizarHospital( hospital )
    .subscribe();
  }

  borrarHospital(hospital : Hospital){
    this._hospitalService.borrarHospital( hospital._id )
    .subscribe( () => this.cargarHospitales() );
  }
  buscarHospital( termino: string ){
    if( termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital( termino )
    .subscribe( hospitales => this.hospitales = hospitales );
  }

  actualizarImagen( hospital: Hospital ){
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

}
