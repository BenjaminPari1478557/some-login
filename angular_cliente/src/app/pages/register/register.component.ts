import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

export const LISTA_BONOS = [
  { id: 'BONO_DEPORTES', titulo: 'Bono Deportes', desc: 'S/.10 apuesta gratis para deportes' },
  { id: 'BONO_CASINO', titulo: 'Bono Casino', desc: 'Obtiene 100 giros gratis' },
  { id: 'BONO_CASINO_EN_VIVO', titulo: 'Bono Casino en Vivo', desc: 'S/.10 para ruleta, futbol Studio y mas' },
  { id: 'SIN_BONO', titulo: 'Sin Bono', desc: 'Escríbenos si cambias de opinión' }
];

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  bonos = LISTA_BONOS;
  maxDate: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.calculateMaxDate();
    this.initForm();
  }

  ngOnInit(): void {
    this.obtenerToken();
  }

  initForm() {
    this.registerForm = this.fb.group({
      tipo_documento: ['DNI', Validators.required],
      nro_documento: ['', [Validators.required, Validators.minLength(8)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', Validators.required],
      bono_bienvenida: ['SIN_BONO', Validators.required], 
      token_seguridad: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  obtenerToken() {
    this.apiService.generateToken().subscribe({
      next: (res) => {
        this.registerForm.patchValue({ token_seguridad: res.token });
      },
      error: (err) => console.error('Error obteniendo token:', err)
    });
  }

  setBono(id: string) {
    this.registerForm.patchValue({ bono_bienvenida: id });
  }

  get f() { return this.registerForm.controls; }

  calculateMaxDate() {
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    this.maxDate = minAgeDate.toISOString().split('T')[0];
  }


  onSubmit() {
    if (this.registerForm.invalid) return;

    const payload = {
      ...this.registerForm.value
    };

    this.apiService.registerClient(payload).subscribe({
      next: (res) => {
        alert('Cliente registrado con exito');
        this.registerForm.reset({ tipo_documento: 'DNI', bono_bienvenida: 0 });
        this.obtenerToken();
      },
      error: (err) => {
        alert('Error al registrar: ' + (err.error?.message || 'Servidor no disponible'));
      }
    });
  }
}