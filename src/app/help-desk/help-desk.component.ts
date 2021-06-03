import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedInboxService } from "../../services/shared-inbox.service";
import { formatDate } from "@angular/common";
import { SanitizePipe } from "../pipe/sanitize.pipe";
@Component({
  selector: "app-help-desk",
  templateUrl: "./help-desk.component.html",
  styleUrls: ["./help-desk.component.css"],
  providers: [SanitizePipe],
})
export class HelpDeskComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private sharedInboxService: SharedInboxService,
    private sanitize: SanitizePipe
  ) {}
  userName = "";
  valid: boolean = false;
  errorMsg = "";
  msgContent: string = "";
  homeTimeLine: any[] = [];
  childReply: any[] = [];
  choosenParent: any = {};
  currentUser: any = {};
  currentUserImage = "";
  ngOnInit() {
    console.log(this.route.snapshot.queryParamMap.get("id"));
    this.sharedInboxService
      .postAPICall("/posts/getTimeLine/", {
        id: this.route.snapshot.queryParamMap.get("id"),
      })
      .subscribe((data) => {
        console.log(JSON.stringify(data));
        var res: any = data;
        this.homeTimeLine = res.timeLineData;
        this.userName = res.name;
        this.currentUser = res.user;
        this.currentUserImage = res.user.photos[0].value;
      });
  }
  tweet(msgText) {
    this.valid = false;
    console.log("msg:" + msgText);
    if (msgText == "") {
      this.errorMsg = "Please type reply.";
      this.valid = true;
      return;
    }
    if (this.sanitize.transform(msgText)) {
      this.errorMsg = "Attempt of cross site scripting";
      this.valid = true;
      return;
    }
    this.sharedInboxService
      .postAPICall("/posts/getHelpDeskDetails/", {
        id: this.currentUser.id,
        textMsg: msgText,
      })
      .subscribe((data) => {
        var userName: any = data;
        this.userName = userName.name;
        this.childReply.push({
          user: {
            profile_image_url_https: userName.user.photos[0].value,
            name: userName.name,
          },
          created_at: formatDate(
            new Date(),
            "dd-MM-yyyy hh:mm:ss a",
            "en-US",
            "+0530"
          ),
          text: msgText,
        });
      });
  }
  getText(data) {
    var text = "";
    if (data.length > 20) text += data.substring(0, 21);
    else text = data;
    return text;
  }

  selectedParent(parent) {
    this.choosenParent = parent;
    this.childReply = [];
    this.childReply.push(parent);
    console.log("index:" + parent);
  }
}
