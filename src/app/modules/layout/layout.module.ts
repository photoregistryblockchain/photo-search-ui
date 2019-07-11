import {NgModule} from '@angular/core';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './components/layout.component';

@NgModule({
    imports: [
        LayoutRoutingModule
    ]
    , declarations: [
        LayoutComponent
    ]
})

export class LayoutModule{}