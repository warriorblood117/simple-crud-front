import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module.';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    ModalComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
