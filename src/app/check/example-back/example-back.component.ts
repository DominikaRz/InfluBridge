import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-example-back',
  templateUrl: './example-back.component.html',
  styleUrls: ['./example-back.component.css']
})
export class ExampleBackComponent implements OnInit {
  constructor(private apiService: ApiServiceService) {}

  url = '/api/v1/employees';

  employees: any[] = [];


  ngOnInit() { //url: string
    this.apiService.getData(this.url).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}


/*
//wcześniejszy servis 'na sztywno'
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-example-back',
  templateUrl: './example-back.component.html',
  styleUrls: ['./example-back.component.css']
})


export class ExampleBackComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
*/
