import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema();
  listaTemas: Tema[];

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertDanger('Sua sessão terminou!');
      this.router.navigate(['/entrar']);
    }
    console.log(environment);

    if (environment.tipo != 'adm') {
      this.alertas.showAlertDanger('Você precisa ser um adm para ter acesso!');
      this.router.navigate(['/inicio']);
    }

    this.temaService.refreshToken();
    this.findAllTemas();
  }
  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      this.alertas.showAlertSecondary('Tema cadastrado com sucesso!');
      this.findAllTemas();
      this.tema = new Tema();
    });
  }
}
