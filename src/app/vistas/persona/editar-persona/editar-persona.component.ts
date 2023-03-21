import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params,Router} from '@angular/router';
import { Persona } from 'src/app/modelo/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit{
  public formRegistro!: FormGroup;
  public base64Image: any;
  public resultadoB64: any;
  opcionesEstadoCivil = [
    { codigo: '1', nombre: 'Soltero' },
    { codigo: '2', nombre: 'Casado' },
  ];

  id: number = 0
  personaData: Persona = {
    nombre:'',
    apellido:'',
    fechaNacimiento: new Date(),
    foto:"",
    estadoCivil:'',
    hermanos: true

  }
  personaRegistro :Persona = new Persona();
  public persona:any;

  constructor( private fb: FormBuilder,private activatedRoute: ActivatedRoute, private personaService: PersonaService, private router:Router){}

  ngOnInit(): void {
    this.crearFormulario();
    this.activatedRoute.params.subscribe((params:Params)=>{this.id = params['id']})
    this.personaService.listarPorId(this.id).subscribe(data => {this.personaData = data})
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
    let personaEditar: Persona = new Persona();
    personaEditar.nombre = this.formRegistro.controls['nombre'].value;
    personaEditar.apellido = this.formRegistro.controls['apellido'].value;
    personaEditar.fechaNacimiento = this.formRegistro.controls['fechaNacimiento'].value;
    personaEditar.foto = this.resultadoB64;
    personaEditar.hermanos = this.formRegistro.controls['hermanos'].value;
    personaEditar.estadoCivil = this.formRegistro.controls['estadoCivil'].value;
    this.editarPersona(personaEditar);
  }

  

 public editarPersona(persona: any){
    this.personaService.actualizar(persona, this.id).subscribe(resp => {
  
    })
  // location.replace("personas");
}
}
