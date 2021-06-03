import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SharedInboxService {
  constructor(private httpRequests: HttpClient) {}

  getAPICall(url) {
    return this.httpRequests.get(url);
  }
  postAPICall(url, param) {
    return this.httpRequests.post(url, param);
  }
}
