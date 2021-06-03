import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HelpDeskComponent } from "./help-desk/help-desk.component";
const routes: Routes = [
  { path: "", redirectTo: "posts/twitter/login/", pathMatch: "full" },
  {
    path: "posts/twitter/login/",
    component: SignInComponent,
  },
  { path: "posts/helpdesk", component: HelpDeskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
