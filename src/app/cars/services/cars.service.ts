import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private apiListUrl: string = "http://localhost:8080/car/all";
  private apiAddUrl: string = "http://localhost:8080/car/add";
  private apiUpdateUrl: string = "http://localhost:8080/car/update";
  private apiDeleteUrl: string = "http://localhost:8080/car/delete";

  

  constructor() { }
}
