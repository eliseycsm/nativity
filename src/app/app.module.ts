import { BrowserModule } from '@angular/platform-browser';
import { Inject, Injector, NgModule } from '@angular/core';
import {} from '@angular/common/http'

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { CardComponent } from './components/card.component';
import { RouterModule, Routes } from '@angular/router';
import { GameService } from './game.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Globals } from './constants';


const ROUTES: Routes = [
  {path: '', component: MainComponent },
  {path: 'card', component: CardComponent },
  {path: '**', redirectTo: "/", pathMatch: 'full' },
]
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    FormsModule, ReactiveFormsModule,

  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector){
    Globals.injector = injector
  }
 }

