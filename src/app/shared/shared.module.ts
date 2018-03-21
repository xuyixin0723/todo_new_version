
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule

  ],
  declarations: []
})
export class SharedModule { }
