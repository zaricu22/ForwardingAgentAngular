import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarrierComponent } from './components/carrier/carrier.component';
import { ManufacturerComponent } from './components/manufacturer/manufacturer.component';
import { DriverComponent } from './components/carrier/driver/driver.component';
import { TruckComponent } from './components/carrier/truck/truck.component';
import { TrailerComponent } from './components/carrier/trailer/trailer.component';
import { ShowDeliveryComponent } from './components/carrier/show-delivery/show-delivery.component';
import { CreateDeliveryComponent } from './components/manufacturer/create-delivery/create-delivery.component';
import { ShowTruckComponent } from './components/manufacturer/show-truck/show-truck.component';
import { ShowTrailerComponent } from './components/manufacturer/show-trailer/show-trailer.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UiprimengModule } from './modules/uiprimeng/uiprimeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobsComponent } from './components/carrier/driver/jobs/jobs.component';
import { LandingComponent } from './components/landing/landing.component';
import { ClickOutsideDirective } from './directives/clickOutside.directive';

@NgModule({
    declarations: [
        AppComponent,
        CarrierComponent,
        ManufacturerComponent,
        LandingComponent,
        DriverComponent,
        TruckComponent,
        TrailerComponent,
        ShowDeliveryComponent,
        CreateDeliveryComponent,
        ShowTruckComponent,
        ShowTrailerComponent,
        LoginComponent,
        RegisterComponent,
        JobsComponent,
        ClickOutsideDirective
    ],
    imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, AppRoutingModule, UiprimengModule],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
