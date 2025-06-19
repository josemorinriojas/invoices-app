import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../../environments/environment';

interface ApiResponse {
  data: any[];
  meta: {
    current_page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
  };
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgxPaginationModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  resultado: any[] = [];
  p: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  isLoading = false;

  constructor(private http: HttpClient) {}

  buscar(resetPage = false) {
    if (resetPage) { this.p = 1; }
    if (!this.fechaInicio || !this.fechaFin) return;

    const params = new HttpParams()
      .set('start_date', this.fechaInicio)
      .set('end_date', this.fechaFin)
      .set('page', this.p.toString())
      .set('per_page', this.itemsPerPage.toString());

    this.isLoading = true;
    this.http.get<ApiResponse>(`${environment.apiUrl}/invoices`, { params })
      .subscribe({
        next: (response) => {
          this.resultado = response.data;
          this.totalPages = response.meta.total_pages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
  }

  cambiarPagina(page: number) {
    this.p = page;
    this.buscar();
  }
}
