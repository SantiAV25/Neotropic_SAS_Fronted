import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mark } from '../models/mark';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  private thirdApiUrl = "http://localhost:8080/api/neutropicmap"

  constructor(private http: HttpClient){
  }

  createMark(mark: mark): Observable<mark>{
    return this.http.post<mark>(this.thirdApiUrl+"/createMark", mark).pipe(
      catchError((error) => {
        console.error('Error occurred: ', error); // Log the error to the console
        return throwError(() => new Error('Error occurred while adding a hero')); // Rethrow the error as a new Observable error
      })
    );
  }

  getAllMarks(): Observable<mark[]>{ 
    return this.http.get<mark[]>(this.thirdApiUrl+"/findAllMarks").pipe(
      map(response => response as mark[]), // Return the data property of the response object
      catchError((error) => {
        console.error('Error occurred: ', error); // Log the error to the console
        return throwError(() => new Error('Error occurred while getting all marks')); // Rethrow the error as a new Observable error
      })
    );
  }

  deleteMark(mark: mark):Observable<mark>{
    return this.http.delete<mark>(`${this.thirdApiUrl}/deleteMark`, { body: mark }).pipe(
      catchError((error) => {
        console.error('Error occurred: ', error); // Log the error to the console
        return throwError(() => new Error('Error occurred while deleting a mark')); // Rethrow the error as a new Observable error
      })
    );
  }



}
