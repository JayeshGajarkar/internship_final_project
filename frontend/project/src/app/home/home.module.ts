import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[HomeComponent]
})

export class HomeModule{}
