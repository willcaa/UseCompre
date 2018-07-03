import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConvidarProfissionalPage } from './convidar-profissional';

@NgModule({
  declarations: [
    ConvidarProfissionalPage,
  ],
  imports: [
    IonicPageModule.forChild(ConvidarProfissionalPage),

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ConvidarProfissionalPageModule {}
