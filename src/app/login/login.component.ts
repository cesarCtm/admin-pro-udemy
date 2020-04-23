import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { NgForm } from '@angular/forms';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    // init_plugins();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }
    this.googleInit();
  }


  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '601422224082-jm9lo8lt39oerlj7ik0sb60reqdbq4ls.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      
      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }
  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser)=>{
      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token).subscribe( () => 
        window.location.href="#/dashboard" 
      );
    });
  }


  ingresar( forma: NgForm ){

      if(forma.invalid){
      Swal.fire('ingreso erroneo', 'algo salio mal y no se que', 'error');
      return;
    }
    
    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login( usuario, forma.value.recuerdame )
    .subscribe( () => 
      this.router.navigate(['/dashboard'])     );

  }
}
