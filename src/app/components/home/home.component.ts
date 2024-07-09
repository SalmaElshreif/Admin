import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  customers: any[] = [];
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;
  addForm: FormGroup;
  editForm: FormGroup;
  selectedCustomerId: number | null = null; 


  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmDialogService: ConfirmationService
  ) { 
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]], 
      period: ['', [Validators.required]]
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
      period: ['', [Validators.required]],
      subscriptionTypeId: ['']
    });

    
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getSub().subscribe(
      (data: any[]) => {
        this.customers = data.map(customer => ({
          ...customer,
          subscriptionTypeId: customer.subscriptionTypeId 
        }));
        console.log('Fetched customers:', this.customers); 
      },
      (error) => {
        console.error('Error fetching customer data:', error);
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
      this.customerService.addSub(this.addForm.value).subscribe(
        () => {
          this.displayAddDialog = false;
          this.getCustomers(); 
        },
        (error) => {
          console.error('Error adding customer data:', error);
        }
      );
    }
  }

  getSubscriptionDetails(subscriptionTypeId: number) {
    if (subscriptionTypeId) { 
      this.customerService.getSubById(subscriptionTypeId).subscribe(
        (data) => {
          console.log('Subscription details:', data);
        },
        (error) => {
          console.error('Error fetching subscription details:', error);
        }
      );
    } else {
      console.error('Invalid ID');
    }
  }

  
  showEditDialog(customer: any) {
    this.selectedCustomerId = customer.subscriptionTypeId;
    this.editForm.patchValue({
      name: customer.name,
      description: customer.description,
      price: customer.price,
      period: customer.period,
      subscriptionTypeId: customer.subscriptionTypeId
    });
    this.displayEditDialog = true;
  }

  update() {
    if (this.editForm.valid) {
      this.customerService.updateSub(this.editForm.value).subscribe(
        () => {
          this.displayEditDialog = false;
          this.getCustomers(); 
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Subscription Type Edited Successfully' });
        },
        (error) => {
          console.error('Error updating customer data:', error);
        }
      );
    }
  }
  

  delete(id: number) {
    this.confirmDialogService.confirm({
      message: 'Are you sure you want to delete this subscription?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.deleteSub(id).subscribe(
          () => {
            this.getCustomers(); 
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Subscription deleted successfully!'});
          },
          (error) => {
            console.error('Error deleting customer data:', error);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete subscription!'});
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