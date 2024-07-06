import { Component, OnInit } from '@angular/core';
import { CarInterface } from '../../interfaces/car.interface';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CarsService } from '../../services/cars.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'cars-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {


  cars: CarInterface[] = [];
  newCar: CarInterface = {
    brand:"",
    model:"",
    fabricationYear: new Date(),
    price:0,
    numberSeats:0,
    color:"",
    fuelType:"",
    transmissionType:"",
    licensePlate:""
  }

  ngOnInit(): void {
    
  }

 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private carService: CarsService,
                 private snackBar: MatSnackBar,
                 public dialog: MatDialog,
                 private router: Router) { }

  addCars(): void {
    this.carService.addCar(this.newCar).subscribe(
      data => {
        console.log('Car added successfully:', data);
        this.mostrarSnackBar(data);
        this.router.navigate(['/list']);
        this.newCar = {
          brand:"",
          model:"",
          fabricationYear: new Date(),
          price:0,
          numberSeats:0,
          color:"",
          fuelType:"",
          transmissionType:"",
          licensePlate:""
        };
      },
      error => {
        console.error('Error at adding car:', error);
        let errorMessage = 'Error at adding car';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Asigna el mensaje de error del servidor si está disponible
        }
        this.mostrarSnackBar(errorMessage); // Muestra el mensaje de error en el snackbar
      }
    );
  }


  private mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000, // Duración en milisegundos que mostrará el snackbar
      horizontalPosition: this.horizontalPosition, // Utiliza la posición horizontal definida
      verticalPosition: this.verticalPosition, // Utiliza la posición vertical definida
    });
  }
}
