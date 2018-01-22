import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Events } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';

@IonicPage({
  name: 'page-add-tags'
})
@Component({
  selector: 'page-add-tags',
  templateUrl: 'add-tags.html',
  providers: [
    ContactService,
  ]
})
export class AddTagsPage {

  tags;
  contact;
  activeTags;
  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public contactService: ContactService,
    public events: Events,
  ) {
    this.tags = this.params.get('tags');
    this.contact = params.get('contact');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTagsPage');
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }
  updateTags(){
      let t = this.tags;
      if(this.contact){
          for(let x of t){
              if(x.active == true){
                  this.activeTags.push(x.id);
              }
          }
          this.contactService.updateTags(this.contact.id, this.activeTags).subscribe(res => {
              this.events.publish('tagsAdded');
              this.dismiss();
          })
      } else {
          this.viewCtrl.dismiss({taggy: this.tags})
      }
  }
  addTag(){
     let alert = this.alertCtrl.create({
          title: 'Add Tag',
          inputs: [
              {
                  name: 'tag',
                  placeholder: 'Tag Name',
                  type: 'text'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel'
              },
              {
                  text: 'Save',
                  handler: data => {
                      let tag = {
                          name: data.tag
                      }
                      this.postTag(tag)
                  }
              }
          ]
      });
      alert.present()
  }
  postTag(tag){
    this.contactService.addTag(tag).subscribe(res => {
      this.getTags();
      console.log(res)
    })
  }
  getTags(){
      this.contactService.getTags().subscribe(res => {
          this.tags = res;
      })
  }

}
