import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rjxs',
  templateUrl: './rjxs.component.html',
  styles: []
})
export class RjxsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() {
    

    this.subcription = this.regresaObservable()
    /* .pipe(
      retry(2)
    ) */
    .subscribe( 
      numero => console.log('subs', numero),
      error => console.log('error en el observador', error),
      () => console.log('el observador termino')
    );
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable( (observer: Subscriber<any> )=> {
      let contador = 1;
      let intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );


        if( contador === 3){
          clearInterval( intervalo );
          observer.complete();
        }
        /* if( contador === 2){          
          // clearInterval( intervalo );
          observer.error('Auxilio!!');
        } */

      },1000);


    }).pipe( 
      map( resp => resp.valor + 1 ),
      filter( (valor, index) =>{
        // console.log('filter',valor, index);
        if( (valor%2) === 1){
          //impar
          return true;
        }
        else{
          //par
          return false;
        }
        // return true;
      })
     );
  }

}
