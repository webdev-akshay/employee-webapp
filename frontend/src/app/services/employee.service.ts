import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/api/items';

  constructor(private http:HttpClient) { }

  async getItems() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addItem(item: any) {
    try {
      const response = await axios.post(this.apiUrl, item);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  deleteEmployee(id:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
  updateEmployee(empId:string,updatedData:any){
    return this.http.put(`${this.apiUrl}/${empId}`,updatedData)
  }


}
