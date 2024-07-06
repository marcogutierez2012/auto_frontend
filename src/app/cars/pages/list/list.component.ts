import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarInterface } from '../../interfaces/car.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CarsService } from '../../services/cars.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'cars-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['marca', 'modelo', 'fechafabricacion', 'precio', 
    'asientos', 'color', 'combustible', 'transmision', 'placa', 'acciones'];
  dataSource: MatTableDataSource<CarInterface>=new MatTableDataSource();; 

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

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

  // Define las posiciones horizontal y vertical para el MatSnackBar
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';
// Variables para manejar la confirmación de eliminación
confirmacionEliminacionVisible: boolean = false;
cartodelete: CarInterface | null = null;
  constructor(private carService: CarsService,
                 private snackBar: MatSnackBar,
                 public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator; 
    this.chargeCars();
  }

  chargeCars(): void {
    this.carService.listCars().subscribe(
      (data: CarInterface[]) => {
        this.cars = data;
        this.dataSource.data = this.cars; // Asigna los datos al dataSource
      },
      error => {
        console.log('Error at charging cars:', error);
      }
    );
  }

  addCars(): void {
    this.carService.addCar(this.newCar).subscribe(
      data => {
        console.log('Car added successfully:', data);
        this.chargeCars();
        this.mostrarSnackBar(data);
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

  updateCar(car: CarInterface): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '400px',
      data: { car }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carService.updateCar(result).subscribe(
          response => {
            console.log('Response from server:', response);
            this.mostrarSnackBar(response); // Muestra el mensaje del servidor
            // Aquí puedes implementar lógica adicional si es necesario
          },
          error => {
            console.error('Error at updating car:', error);
            let errorMessage = 'Error at updating car';
            if (error.error && typeof error.error === 'string') {
              errorMessage = error.error; // Asigna el mensaje de error del servidor si está disponible
            }
            this.mostrarSnackBar(errorMessage); // Muestra el mensaje de error en el snackbar
          }
        );
      }
    });
  }



  deleteCar(id: number | undefined): void {
    if (id !== undefined) {
      this.carService.deleteCar(id).subscribe(
        response => {
          console.log('Car deleted successfully:', response);
          this.mostrarSnackBar(response); // Muestra el mensaje del servidor
          this.chargeCars(); // Actualiza la lista de usuarios después de eliminar
        },
        error => {
          console.error('Error at deleting car:', error);
          let errorMessage = 'Error at deleting car';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error; // Asigna el mensaje de error del servidor si está disponible
          }
          this.mostrarSnackBar(errorMessage); // Muestra el mensaje de error en el snackbar
        }
      );
    } else {
      console.error('Undefined car ID.');
      this.mostrarSnackBar('Undefined car ID. It cannot be deleted.');
    }

    this.confirmacionEliminacionVisible = false; // Oculta el modal de confirmación después de eliminar
  }

  /*confirmarEliminar(id: number | undefined): void {
    this.deleteCar = id;
    this.confirmacionEliminacionVisible = true;
  }*/
  cancelarEliminar(): void {
    this.confirmacionEliminacionVisible = false;
  }

  private mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000, // Duración en milisegundos que mostrará el snackbar
      horizontalPosition: this.horizontalPosition, // Utiliza la posición horizontal definida
      verticalPosition: this.verticalPosition, // Utiliza la posición vertical definida
    });
  }
}
