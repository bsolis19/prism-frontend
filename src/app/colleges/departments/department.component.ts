import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModule, NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { DepartmentService } from './department.service';

import { Department } from '../../models/department.model'
import { College } from '../../models/college.model';

@Component({
  selector: 'prism-departments',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @Input() collegeId: string;
  modal: NgbModalRef;
  options: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size: 'lg',
  };
  department: Department = new Department();
  departments: Department[] = [];
  alerts: IAlert[] = [];

  constructor(private departmentService: DepartmentService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.departmentService.getDepartmentsAt(this.collegeId).subscribe(data => {
      this.departments = data;
      console.log(data);
    });
  }

  invalidErrorMessage(message) {
    this.alerts = [];
    let detailMsg = '';

    switch (message) {
      case 'empty department':
        detailMsg = 'Please input a department name.';
        break;
      case 'empty abbreviation':
        detailMsg = 'Please input an abbreviation.';
        break;
      case 'empty college':
        detailMsg = 'Please select a college.';
        break;
    }
    this.alerts.push({type: 'warning', message: detailMsg });
  }

  openModal(content) {
    this.modalService.open(content, this.options)
  }
  closeModal() {
    this.alert = '';
    this.message = '';
    this.file = null;
    this.fileName = '';
    this.modal.close();
  }
  //
  // // deleteDepartmentModal(content, id){
  // //   this.alerts = [];
  // //   this.deleteCollege(id);
  // //   this.modal = this.modalService.open(content, this.options);
  // // }
  //
  submitDepartment() {
    this.alerts = [];
    console.log("Sumbitted")
    this.department.college = this.collegeId;
    if (typeof(this.department.name) !== 'undefined' && this.department.name.trim().length > 0) {
      if (typeof(this.department.abbreviation) !== 'undefined' && this.department.abbreviation.trim().length > 0) {
        this.departmentService.addDepartment(this.department).subscribe(
          data => {
            this.departments.push(data);
            this.departments = this.department.slice(0);
          }
        );
        this.department = new Department();
        this.closeModal();
      } else {
          this.invalidErrorMessage('empty abbreviation');
        }
    } else {
      this.invalidErrorMessage('empty department');
    }
  }

  getDepartmentsAt(collegeId) {
    this.departmentService.getDepartmentsAt(collegeId).subscribe( data => {
      this.departments = data;
      console.log(data);
    })
  }
}
export interface IAlert {
  type: string;
  message: string;
}
