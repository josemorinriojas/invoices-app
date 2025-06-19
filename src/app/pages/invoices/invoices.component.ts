import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http'; // 👈 importa HttpClientModule

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  resultado: any[] = [];

  constructor(private http: HttpClient) {}

  buscar() {
    if (!this.fechaInicio || !this.fechaFin) return;

    const params = new HttpParams()
      .set('start_date', this.fechaInicio)
      .set('end_date', this.fechaFin);

    this.http.get<any[]>('http://localhost:3000/api/v1/invoices', { params })
      .subscribe({
        next: (data) => this.resultado = data,
        error: (err) => console.error(err)
      });
  }
}
