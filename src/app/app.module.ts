import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.route';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { getFullApi } from './common/services/ApiCalls/getFullApi.service';
import { handleFunction } from './common/services/functions/handleFunctions';
import { HandleDataService } from './common/services/Data/handle-data.service';
import { ExcelService } from './common/services/sharedServices/excel.service';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule, 
  MatIconModule,
  MatSidenavModule
} from '@angular/material';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/CI/account/account.component';
import { SalaryComponent } from './pages/CI/salary/salary.component';
import { StoreComponent } from './pages/CI/store/store.component';
import { HotelOrderComponent } from './pages/CI/hotel-order/hotel-order.component';
import { ZomatoComponent } from './pages/CI/zomato/zomato.component';
import { SettingsComponent } from './pages/CI/settings/settings.component';
import { EmptyComponent } from './pages/empty/empty.component';
import { RegisterComponent } from './pages/Register/register/register.component';
import { MaterialComponent } from './pages/Material/material/material.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    AccountComponent,
    SalaryComponent,
    StoreComponent,
    HotelOrderComponent,
    ZomatoComponent,
    SettingsComponent,
    EmptyComponent,
    RegisterComponent,
    MaterialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot()

  ],
  providers: [getFullApi, handleFunction, HandleDataService, ExcelService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
