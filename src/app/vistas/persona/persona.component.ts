import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/servicios/persona.service';
import { Persona } from 'src/app/modelo/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent {
  public id: any;
  public formRegistro!: FormGroup;
  public per: any;
  public respuesta: any;
  public personas: any = [];
  public listaPersonas!: any;
  public base64Image: any;
  public resultadoB64: any;
  public seleccion: any;
  public contador = 0;
  opcionesEstadoCivil = [
    { codigo: '1', nombre: 'Soltero' },
    { codigo: '2', nombre: 'Casado' },
  ];

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.listarPersonas();
  }

  readImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
        this.resultadoB64 = this.base64Image.substring(23);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private crearFormulario() {
    this.formRegistro = this.fb.group({
      id: [''],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      foto: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      hermanos: [null, Validators.required],
    });
  }

  public guardar() {
    let personaRegistro: Persona = new Persona();
    personaRegistro.nombre = this.formRegistro.controls['nombre'].value;
    personaRegistro.apellido = this.formRegistro.controls['apellido'].value;
    personaRegistro.fechaNacimiento = this.formRegistro.controls['fechaNacimiento'].value;
    personaRegistro.foto = this.resultadoB64;
    personaRegistro.hermanos = this.formRegistro.controls['hermanos'].value;
    personaRegistro.estadoCivil = this.formRegistro.controls['estadoCivil'].value;
    this.registarPersona(personaRegistro);
  }

  public registarPersona(persona: any) {
    this.personaService.registrar(persona).subscribe((res) => {
    });
    location.reload();
  }

  public listarPersonas() {
    this.personaService.listar().subscribe((res) => {
      this.personas = res;
      this.listaPersonas = this.personas;
      
    });
  }

  public eliminar(id: number) {
    this.personaService.eliminar(id).subscribe((res) => {});
    location.reload();
  }
}
