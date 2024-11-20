import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  items: any[] = [];
  showAddEmpCard:boolean=false
  isEditMode:boolean=false
  item = {
    name: '',
    designation: '',
    empId:'',
    empCode:'',
    empEmailId:'',
    role:'',
    mobile:''

  };
  constructor(private itemService:EmployeeService) { }
  showAddEmp(){
    this.showAddEmpCard=!this.showAddEmpCard;
    if(!this.isEditMode){
      this.item = {
        name: '',
        designation: '',
        empId:'',
        empCode:'',
        empEmailId:'',
        role:'',
        mobile:''

      };
    }
  }
  addItem() {
    this.itemService.addItem(this.item).then(() => {
      this.resetForm();
    }
  );
  }
  refreshEmployeeList(){
    this.itemService.getItems().then(data => this.items = data);
  }
  deleteEmployeeRecord(id:string){
    this.itemService.deleteEmployee(id).subscribe(()=>{
      alert('Employee Deleted successfully');
      this.refreshEmployeeList()
    })
  }
  editEmployee(item: any) {
    this.item = { ...item }; // Removed unnecessary comma
    this.showAddEmpCard = true;
    this.isEditMode = true;
  }
  updateEmployee(){
    this.itemService.updateEmployee(this.item.empId,this.item).subscribe(
      ()=>{
      alert('Employee Updated Successfully');
      this.refreshEmployeeList();
      this.showAddEmpCard=false;
    },
  (error)=>{
    console.log(error)
  })
  }
  resetForm(){
    this.item = {
      name: '',
      designation: '',
      empId:'',
      empCode:'',
      empEmailId:'',
      role:'',
      mobile:''

    };
    this.isEditMode=false;
    this.showAddEmpCard=false;
    this.refreshEmployeeList();
  }
  handleSubmit(){
    if(this.isEditMode){
      this.updateEmployee();
    }else{
      this.addItem();
    }
  }

  ngOnInit(): void {
    this.refreshEmployeeList()
  }

}
