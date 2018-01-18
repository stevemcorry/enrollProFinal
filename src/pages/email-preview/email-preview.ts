import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DomSanitizer} from '@angular/platform-browser';

@IonicPage({
  name: 'page-email-preview'
})
@Component({
  selector: 'page-email-preview',
  templateUrl: 'email-preview.html',
})
export class EmailPreviewPage {

  content;
  subject;
  body;
  signature;
  safeContent;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public sanitizer: DomSanitizer
  ) {
    this.content = params.get('content');
    this.subject = params.get('subject');
    this.body = params.get('body');
    this.signature = params.get('signature');
    console.log('stuff', this.content,this.subject,this.signature,this.body)
    this.setPreview()
  }

  ionViewDidLoad() {
  }
  setPreview(){
    let safe = this.content
    .replace("{{ header }}", this.subject ? this.subject :' ')
    .replace("{{ body }}", this.body ? this.body :' ')
    .replace("{{ footer }}", this.signature ? this.signature :' ' );
    //this.safeContent = safe;
    this.safeContent= this.sanitizer.bypassSecurityTrustHtml(safe);
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

}
