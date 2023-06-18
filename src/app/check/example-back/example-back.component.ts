import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-example-back',
  templateUrl: './example-back.component.html',
  styleUrls: ['./example-back.component.css']
})
export class ExampleBackComponent implements OnInit {
  constructor(private apiService: ApiServiceService) {}

  url = 'localhost:8080/api/v1/campaign/influencer/1';

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
