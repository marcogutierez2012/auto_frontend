import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'cars-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateComponent>,
    private carService: CarsService
  ) { }

  guardarCambios(): void {
    this.carService.updateCar(this.data.car).subscribe(
      result => {
        console.log('Auto actualizado correctamente:', result);
        this.dialogRef.close(this.data.car);
      },
      error => {
        console.error('Error al actualizar auto:', error);
      }
    );
  }

}
