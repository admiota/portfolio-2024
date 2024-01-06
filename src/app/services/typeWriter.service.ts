import { Injectable } from '@angular/core';
import { EMPTY, Subject, concat, concatMap, delay, filter, finalize, from, ignoreElements, interval, map, mergeMap, of, repeat, scan, take, takeWhile, tap } from 'rxjs';

interface TypeOptions {
  word: string;       // Palabra a escribir o borrar
  speed: number;      // Velocidad de escritura o borrado
  backward?: boolean; // Bandera opcional para indicar si se va a borrar en reversa
}
@Injectable({
  providedIn: 'root'
})

export class TypeWriterService {
    private textSource = new Subject<string>();
    text$ = this.textSource.asObservable();

    private type(options: TypeOptions) {
      // Desestructuramos las opciones
      const { word, speed, backward = false } = options;
      const chars = word.split('');

      // Generamos observables para cada carácter de la palabra
      const typeEffects = chars.map((char, i) => {
        const currentText = backward
          ? chars.slice(0, chars.length - i).join('')
          : chars.slice(0, i + 1).join('');

        return of(currentText).pipe(delay(speed));
      });

      // Concatenamos los observables para obtener el efecto completo
      return concat(...typeEffects);
    }

    // Función principal que realiza el efecto de mecanografía
    onTypeText(texts: string[], speed: number) {
      const typeEffects = texts.map((text, index) =>
        concat(
          // Efecto de escribir
          this.type({ word: text, speed, backward: false }),
          // Pausa después de escribir
          of('').pipe(delay(1500)),
          // Efecto de borrar si no es el último texto
          this.type({ word: text, speed: 30, backward: true })
        )
      );

      // Concatenamos todos los efectos y actualizamos el observable de texto
      concat(...typeEffects)
        .pipe(
          repeat() // Repetir infinitamente
        )
        .subscribe((result) => {
          console.log(result);
          this.textSource.next(result);
        });
      }
  }













  /*onTypeText(texts: string[], speed: number){
    const arrayTexts = from(texts);
    const arrayTextsObs = arrayTexts.pipe(
      concatMap((text) => {
        const chars= text.split('');
          return interval(speed).pipe(
          map(i => {
            if (i < chars.length) {
              return chars.slice(0, i + 1).join('');
            } else {
              return chars.slice(0, chars.length * 2 - i - 1).join('');
            }
          }),
          tap(text => this.textSource.next(text)),
          filter((text) => text !== '')
        )
      })

    );

    arrayTextsObs.subscribe(val=> console.log(val))



      /*const speedObservable = interval(speed);
      from(texts).pipe(
        mergeMap(x=>x),
      ).subscribe(value => {
        console.log(value);
      });*/
      /*arrayTexts.subscribe(text=>{
        const chars =  text.split('');
        speedObservable.subscribe(i=>{
          if(i<chars.length-1){
            this.typeText = chars.slice(0, i + 1).join('');
            console.log(this.typeText);
          }
    
      })
    })
  }*/
