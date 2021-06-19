import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-empployee-list',
  templateUrl: './empployee-list.component.html',
  styleUrls: ['./empployee-list.component.scss']
})
export class EmpployeeListComponent implements OnInit {

  nameControl = new FormControl();
  addressControl = new FormControl();
  companyControl = new FormControl();
  namesArr: any[] = [];
  addressArr: any[] = [];
  companyArr: any[] = [];
  filteredNames: Observable<any[]>;
  filteredAddress: Observable<any[]>;
  filteredCompany: Observable<any[]>;


  @Input('employeeList') employeeList: any;
  @Input('isDeleted') isDeleted: any;
  @Output() editClick = new EventEmitter<Observable<any>>();
  @Output() deleteClick = new EventEmitter<Observable<any>>();
  @Output() restoreClick = new EventEmitter<Observable<any>>();

  tempArr: any = [];



  constructor() { }

  ngOnChanges() {
    console.log(this.employeeList)
    this.employeeList.forEach((emp: any) => {
      this.namesArr.push(emp.name)
    });
    this.employeeList.forEach((emp: any) => {
      let address = emp.address.street + ',' + emp.address.suite + ',' + emp.address.city + ',' + emp.address.zipcode;
      this.addressArr.push(address)
    });
    this.employeeList.forEach((emp: any) => {
      this.companyArr.push(emp.company.name)
    });
    console.log("name", this.namesArr);
    this.tempArr = [...this.employeeList];
  }

  ngOnInit(): void {
    this.filteredNames = this.nameControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value))
    );

    this.filteredAddress = this.addressControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value))
    );

    this.filteredCompany = this.companyControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter3(value))
    );

  }

  onEdit(emp: any) {
    this.editClick.emit(emp);
  }

  onDelete(emp: any, index: number) {
    let obj: any = { emp: emp, index: index }
    this.deleteClick.emit(obj);
  }

  onRestore(emp: any) {
    this.restoreClick.emit(emp);
  }

  private _filter1(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.namesArr.filter((name: any) => this._normalizeValue(name).includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.addressArr.filter((address: any) => this._normalizeValue(address).includes(filterValue));
  }

  private _filter3(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.companyArr.filter((company: any) => this._normalizeValue(company).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onSelect(type: any) {
    let resultArr = [];
    if (type == 'name') {
      resultArr = this.tempArr.filter((tem: any) => (tem.name == this.nameControl.value))
      console.log(resultArr)
    } else if (type == 'address') {
      resultArr = this.tempArr.filter((tem: any) => {
        let address = tem.address.street + ',' + tem.address.suite + ',' + tem.address.city + ',' + tem.address.zipcode;
        if (address == this.addressControl.value) {
          return tem;
        }
      })
    } else if (type == 'company') {
      resultArr = this.tempArr.filter((tem: any) => (tem.company.name == this.companyControl.value))
    }
    this.tempArr = resultArr;
    this.employeeList = this.tempArr;
    console.log(resultArr)
  }
}
