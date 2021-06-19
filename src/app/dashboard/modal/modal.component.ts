import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  employeeForm = new FormGroup({
    name: new FormControl(''),
    company: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      street: new FormControl(''),
      suite: new FormControl(''),
      zipcode: new FormControl('')
    })
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public empData: any
  ) {
    if (!this.empData.isAdd) {
      this.employeeForm.setValue({
        name: this.empData.emp.name,
        company: this.empData.emp.company.name,
        address: {
          city: this.empData.emp.address.city,
          street: this.empData.emp.address.street,
          suite: this.empData.emp.address.suite,
          zipcode: this.empData.emp.address.zipcode,
        }
      })
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.employeeForm.setValue({
      name: this.employeeForm.value.name,
      company: this.employeeForm.value.company,
      address: {
        city: this.employeeForm.value.address.city,
        street: this.employeeForm.value.address.street,
        suite: this.employeeForm.value.address.suite,
        zipcode: this.employeeForm.value.address.zipcode,
      }
    })
    this.dialogRef.close(this.employeeForm.value);
  }

}
