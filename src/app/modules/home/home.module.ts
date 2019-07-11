import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home.component';


@NgModule({
    imports: [
        HomeRoutingModule
        , CommonModule
    ]
    ,declarations: [
        HomeComponent
    ]
})

export class HomeModule{

}