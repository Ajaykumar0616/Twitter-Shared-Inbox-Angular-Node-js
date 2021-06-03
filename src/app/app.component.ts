import { Component } from "@angular/core";
import { SharedInboxService } from "../services/shared-inbox.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "sharedInbox";
  response = "Hello";
  constructor(private sharedInboxService: SharedInboxService) {}
  getData() {
    this.sharedInboxService.getAPICall("/posts/").subscribe(
      (data) => {
        var res: any = data;
        this.response += res.name;
      },
      (error) => {
        console.log("error: ", error);
      }
    );
  }
}
