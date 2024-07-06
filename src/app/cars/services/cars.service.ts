import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CarInterface } from '../interfaces/car.interface';
import { Carid } from '../interfaces/carid.interface';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private baseUrl = "http://localhost:8080/car";

  constructor(private http:HttpClient) { }

  listCars(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(`${this.baseUrl}/all`);
  }

  addCar(car: CarInterface): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, car,{ responseType: 'text' }).pipe(
        tap((response: any) => {

            console.log(response);
  }))

 
}
updateCar(car: CarInterface): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, car, { responseType: 'text' });
  }

  deleteCar(carid: Carid): Observable<any> {
    return this.http.post(`${this.baseUrl}/eliminar`, carid, { responseType: 'text' });
  }
}
