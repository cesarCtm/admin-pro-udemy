import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/model-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor( public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios() ); 
  }

  mostrarModal( id: string){
    this._modalUploadService.mostrarModal( 'usuarios', id);
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {
      
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;

    });
  }
  cambiarDesde( valor: number){
    let desde = this.desde + valor;
    console.log( desde );
    if( desde >= this.totalRegistros ){
      return;
    }
    if( desde < 0 ){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string){
    if( termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this.cargando =  true;
    this._usuarioService.buscarUsuario( termino )
    .subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
    
  }

  borrarUsuario(usuario){

    if( usuario._id === this._usuarioService.usuario._id){
      Swal.fire('no puede borrarse a si mismo', 'por que romperia la cuarta pared', 'question');
      return;
    }
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a: "+ usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar '
    }).then((result) => {
      if (result.value) {
        if(result.value){
          this._usuarioService.borrarUsuario( usuario._id )
          .subscribe( resp => {
            console.log(resp);
            this.cargarUsuarios();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          });
          
        }
        
      }
    })
  }
  guardarUsuario( usuario ){
    this._usuarioService.actualizarUsuario( usuario )
    .subscribe();
  }
}
