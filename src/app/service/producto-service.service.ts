import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../interface/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  public urlBase = "http://localhost:8080/Azurian-app/v1/productos";

  constructor(private clienteHttp: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.clienteHttp.get<Producto[]>(this.urlBase)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error al obtener productos desde de back:', error);
    return throwError('Error al obtener productos ver que paso');
  }
}
