import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HelpDeskComponent } from "./help-desk/help-desk.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { SanitizePipe } from './pipe/sanitize.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HelpDeskComponent,
    HeaderComponent,
    FooterComponent,
    SanitizePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class AppModule {}
