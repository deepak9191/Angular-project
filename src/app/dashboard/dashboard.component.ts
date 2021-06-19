import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employeeList: any = [];
  deletedList: any = [];

  constructor(private dataService: EmployeeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmpList();
  }

  getEmpList() {
    this.dataService.getEmployeeList().subscribe((res: any) => {
      this.employeeList = res;
      let localArray: any = [] = JSON.parse(localStorage.getItem('empList') || '{}');
      this.employeeList = [...this.employeeList, ...localArray];

      console.log("sortedArr", this.employeeList)
    })
  }

  onDeleteClick(data: any) {
    let index = data.index;
    if (index !== -1) {
      this.employeeList.splice(index, 1);
      this.deletedList.push(data.emp);
    }
  }

  onEditClick(data: any) {
    const dialogRef = this.dialog.open(ModalComponent,
      {
        restoreFocus: false,
        width: '500px',
        data: { emp: data, isAdd: false }
      });

    dialogRef.afterClosed().subscribe(result => {
      data.name = result.name;
      data.company.name = result.company;
      data.address.city = result.address.city;
      data.address.street = result.address.street;
      data.address.suite = result.address.suite;
      data.address.zipcode = result.address.zipcode;
    });
  }

  onRestoreClick(data: any) {
    this.employeeList.push(data);
  }

  onAddEmployee() {
    const dialogRef = this.dialog.open(ModalComponent,
      {
        restoreFocus: false,
        width: '500px',
        data: { isAdd: true }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log("res", result);
      if (result) {
        let obj = {
          name: result.name,
          company: {
            name: result.company
          },
          address: {
            city: result.address.city,
            street: result.address.street,
            suite: result.address.suite,
            zipcode: result.address.zipcode,
            geo: {
              lat: '0',
              lng: '0'
            }
          }
        }
        this.employeeList.push(obj);
        let addedList = JSON.parse(localStorage.getItem('empList') || '{}');;
        addedList.push(obj);
        localStorage.setItem("empList", JSON.stringify(addedList));

      }
    });
  }
}
