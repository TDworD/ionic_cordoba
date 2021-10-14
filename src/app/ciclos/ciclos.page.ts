import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.page.html',
  styleUrls: ['./ciclos.page.scss'],
})
export class CiclosPage implements OnInit,OnChanges {

  public texto = "nada";

  constructor(private nav:NavController) { 
    console.log('Creando página');
  }

  ngOnInit() {
    console.log('Inciando página');
  }
  ngOnDestroy() {
    console.log('Destruyendo página');
  }

  ngDoCheck() {
    console.log('Realizando check');
  }

  ionViewDidEnter() {
    console.log('en ionViewDidEnter');
  }

  ionViewWillEnter() {
    console.log('en Will enter');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Realizando cambios');
  }

  ngAfterViewInit() {
    console.log('En el after view init');
  }

  cerrar() {
    this.nav.back();
  }

  cambios() {
    this.texto = "todo";
  }

}
