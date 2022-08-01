import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CarrierComponent } from './components/carrier/carrier.component';
import { DriverComponent } from './components/carrier/driver/driver.component';
import { ShowDeliveryComponent } from './components/carrier/show-delivery/show-delivery.component';
import { TrailerComponent } from './components/carrier/trailer/trailer.component';
import { TruckComponent } from './components/carrier/truck/truck.component';
import { ManufacturerComponent } from './components/manufacturer/manufacturer.component';
import { CreateDeliveryComponent } from './components/manufacturer/create-delivery/create-delivery.component';
import { ShowTruckComponent } from './components/manufacturer/show-truck/show-truck.component';
import { ShowTrailerComponent } from './components/manufacturer/show-trailer/show-trailer.component';
import { Role } from './enums/role.enum';
import { JobsComponent } from './components/carrier/driver/jobs/jobs.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'carrier', component: CarrierComponent, canActivate: [AuthGuard], data: { role: [Role.Carrier] } },
    { path: 'carrier/show-delivery', component: ShowDeliveryComponent, canActivate: [AuthGuard], data: { role: [Role.Carrier] } },
    { path: 'carrier/driver', component: DriverComponent, canActivate: [AuthGuard], data: { role: [Role.Carrier] } },
    { path: 'carrier/driver/jobs', component: JobsComponent, canActivate: [AuthGuard], data: { role: [Role.Carrier] } },
    { path: 'carrier/truck', component: TruckComponent, canActivate: [AuthGuard], data: { role: [Role.Carrier] } },
    { path: 'carrier/trailer', component: TrailerComponent, canActivate: [AuthGuard], data: { role: [Role.Carrier] } },
    { path: 'manufacturer', component: ManufacturerComponent, canActivate: [AuthGuard], data: { role: [Role.Manufacturer] } },
    { path: 'manufacturer/create-delivery', component: CreateDeliveryComponent, canActivate: [AuthGuard], data: { role: [Role.Manufacturer] } },
    { path: 'manufacturer/show-truck', component: ShowTruckComponent, canActivate: [AuthGuard], data: { role: [Role.Manufacturer] } },
    { path: 'manufacturer/show-trailer', component: ShowTrailerComponent, canActivate: [AuthGuard], data: { role: [Role.Manufacturer] } },
    { path: 'home', component: LandingComponent },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
