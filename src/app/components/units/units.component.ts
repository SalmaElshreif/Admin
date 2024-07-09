import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/services/customer.service';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit{
  units: any[] = [];
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;
  addForm: FormGroup;
  editForm: FormGroup;
  selectedUnitId: number | null = null; 


  constructor(
    private customerService: CustomerService,
    private UnitsService: UnitsService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmDialogService: ConfirmationService
  ) { 
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required]], 
      nameEn: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      nameEn: ['', [Validators.required]],
      unitId: ['']
    });

    
  }

  ngOnInit() {
    this.getUnits();
  }

  getUnits() {
    this.UnitsService.getUnits().subscribe(
      (data: any[]) => {
        this.units = data.map(units => ({
          ...units,
          unitId: units.unitId 
        }));
        console.log('Fetched units:', this.units); 
      },
      (error) => {
        console.error('Error fetching units data:', error);
      }
    );
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  resetForm() {
    this.addForm.reset();
  }

  save() {
    if (this.addForm.valid) {
      this.UnitsService.addUnits(this.addForm.value).subscribe(
        () => {
          this.displayAddDialog = false;
          this.getUnits(); 
        },
        (error) => {
          console.error('Error adding units data:', error);
        }
      );
    }
  }



  
  showEditDialog(unit: any) {
    this.selectedUnitId = unit.unitId;
    this.editForm.patchValue({
      name: unit.name,
      code: unit.code,
      nameEn: unit.nameEn,
      unitId: unit.unitId
    });
    this.displayEditDialog = true;
  }

  update() {
    if (this.editForm.valid) {
      this.UnitsService.updateUnits(this.editForm.value).subscribe(
        () => {
          this.displayEditDialog = false;
          this.getUnits(); 
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Unit Edited Successfully' });
        },
        (error) => {
          console.error('Error updating units data:', error);
        }
      );
    }
  }
  

  delete(unitId: number) {
    this.confirmDialogService.confirm({
      message: 'Are you sure you want to delete this unit?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.UnitsService.deleteUnits(unitId).subscribe(
          () => {
            this.getUnits(); 
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Unit deleted successfully!'});
          },
          (error) => {
            console.error('Error deleting unit data:', error);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete Unit!'});
          }
        );
      },
      reject: () => {
        console.log('Deletion cancelled');
      },
      key: 'positionDialog',
    });
  }
}