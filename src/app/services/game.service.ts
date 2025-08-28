import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GameResult {
  balance: number;
  bet: number;
  spin: string[];
  win: boolean;
  gain: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://slot-machine-api-production.up.railway.app/api/slot-machine';

  constructor(private http: HttpClient) { }

  getBalance(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance`);
  }

  makeDeposit(amount: number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/deposit`, { amount });
  }

  spin(bet: number): Observable<GameResult> {
    return this.http.post<GameResult>(`${this.apiUrl}/spin`, { bet });
  }
}