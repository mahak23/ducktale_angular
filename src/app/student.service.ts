import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  serverApiUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  /**
   * Get Classes
   * @returns 
   */
  getClasses() {
    return this.httpClient.get(this.serverApiUrl + '/students/classes');
  }

  /**
    * Get Student data by id
    * @returns
    */
  getStudentById(id: any) {
    return this.httpClient.get(this.serverApiUrl + '/students/student/' + id);
  }

  /**
   * Get Subjects
   * @returns 
   */
  getSubjects(id: any) {
    return this.httpClient.get(this.serverApiUrl + '/students/subjects/' + id);
  }

  /**
   * Get Students
   * @returns 
   */
  getStudents() {
    return this.httpClient.get(this.serverApiUrl + '/students');
  }

  /**
   * Delete Student
   * @param id 
   * @returns 
   */
  deleteStudent(id: any) {
    return this.httpClient.delete(this.serverApiUrl + '/students/' + id);
  }

  /**
   * Add Student
   * @param data 
   * @returns 
   */
  addStudent(data: any) {
    return this.httpClient.post(this.serverApiUrl + '/students', data);
  }

  /**
   * Edit Student
   * @param id 
   * @param data 
   * @returns 
   */
  updateStudent(id: any, data: any) {
    return this.httpClient.put(this.serverApiUrl + '/students/' + id, data);
  }
}