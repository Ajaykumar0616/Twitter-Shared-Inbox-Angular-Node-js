import { Component, OnInit } from "@angular/core";
import { SharedInboxService } from "../../services/shared-inbox.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  constructor(
    private sharedInboxService: SharedInboxService,
    private router: Router
  ) {}

  ngOnInit() {}
  signIn() {
    this.router.navigate(["posts/helpdesk"]);
    /* this.sharedInboxService
      .getAPICall("/posts/twitter/login/")
      .subscribe((data) => {
        console.log(JSON.stringify(data));
        var res: any = data;
        if (res.id != null) this.router.navigate(["/posts/signIn/"]);
      });*/
  }
}
