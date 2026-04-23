import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  persona = {
    nombre: '',
    email: '',
    telefono: '',
  };

  mensaje = '';
  personas: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.http.get<any[]>('/api/personas').subscribe((data) => {
      this.personas = data;
    });
  }

  guardar() {
    this.http.post('/api/personas', this.persona).subscribe(() => {
      this.mensaje = '¡Persona guardada correctamente!';
      this.persona = { nombre: '', email: '', telefono: '' };
      this.cargarPersonas();
    });
  }
}
