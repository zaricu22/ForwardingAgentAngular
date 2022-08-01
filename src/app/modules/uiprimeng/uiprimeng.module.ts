import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderListModule } from 'primeng/orderlist';
import { RatingModule } from 'primeng/rating';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';

@NgModule({
    exports: [
        CommonModule,
        CardModule,
        SliderModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        TabMenuModule,
        StepsModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        SidebarModule,
        DropdownModule,
        DataViewModule,
        DialogModule,
        PanelMenuModule,
        InputNumberModule,
        OrderListModule,
        RatingModule,
        OverlayPanelModule,
        CalendarModule,
        ChartModule
    ]
})
export class UiprimengModule {}
