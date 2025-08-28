import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService, GameResult } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  balance: number = 0;
  bet: number = 10;
  lastResult: GameResult | null = null;
  isSpinning: boolean = false;
  depositAmount: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadBalance();
  }

  loadBalance() {
    this.gameService.getBalance().subscribe(
      balance => this.balance = balance
    );
  }

  spin() {
    if (this.bet <= 0 || this.bet > this.balance || this.isSpinning) {
      return;
    }

    this.isSpinning = true;
    this.gameService.spin(this.bet).subscribe(
      result => {
        this.lastResult = result;
        this.balance = result.balance;
        this.isSpinning = false;
      }
    );
  }

  makeDeposit() {
    if (this.depositAmount <= 0) {
      return;
    }

    this.gameService.makeDeposit(this.depositAmount).subscribe(
      newBalance => {
        this.balance = newBalance;
        this.depositAmount = 0;
      }
    );
  }
}