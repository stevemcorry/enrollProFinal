import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, Events, ModalController } from 'ionic-angular';
import { PipelineService } from '../../services/pipeline.service';
import { ContactService } from '../../services/contact.service';
import { StorageService } from '../../services/storage.service';


@IonicPage({
  name: 'page-edit-contact'
})
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
  providers: [
      PipelineService, 
      ContactService,
      StorageService,
    ]
})
export class EditContactPage {

  @ViewChild('editPipe') choosePipe: Slides;
  activeSlide;
  contact;
  customerOn = false;
  builderOn = false;
  sharerOn = false;
  slides = [];
  subscribed;
  tags = [];
  allSlides = this.pipeService.allSlides;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public pipeService: PipelineService,
    public contactService: ContactService,
    public storageService: StorageService,
    public events: Events
  ) {
    let contact = navParams.get('contact');
    this.contact = contact;
    this.getTags();
    if(this.contact.role.id == 1){
        this.changeRole('builderOn')
    } else if(this.contact.role.id == 2){
        this.changeRole('customerOn')
    } else if(this.contact.role.id == 3){
        this.changeRole('sharerOn')
    }
  }

  ionViewDidLoad() {
    setTimeout(()=>{
        if(this.contact.pipeline_position.id >= 8){
            this.pickSlide(this.contact.pipeline_position)
        } else {
            this.choosePipe.slideTo(this.contact.pipeline_position.id - 1);
        }
    },100)
    this.storageService.getSubscribed().then(res=>{
        console.log(res)
        this.subscribed = res;
    })
  }
  
  dismiss(){
      this.viewCtrl.dismiss();
  }
  pickSlide(id){
      for(let slide of this.slides){
          if(slide.id == id.id){
              console.log(this.choosePipe, slide)
              this.choosePipe.slideTo(this.slides.indexOf(slide));
          }
      }
  }
  getIndex(x){
      if(this.choosePipe.getActiveIndex() > 13){
          this.choosePipe.slideTo(13);
      }
      if(this.choosePipe.getActiveIndex() == this.slides.indexOf(x)){
          this.activeSlide = x;
          return true;
      } else {
          return false;
      }
  }
  slideChange() {
      let x = this.choosePipe.getActiveIndex();
      this.advancePipe(this.activeSlide.id)
  }
  advancePipe(x){
      this.contact.pipeline_position.id = x;
  }
  changeRole(role){
      this.customerOn = false;
      this.builderOn = false;
      this.sharerOn = false;
      switch(role){
          case 'customerOn': 
              this.customerOn = true
              this.customerPipe()
              break;
          case 'builderOn': 
              this.builderOn = true
              this.builderPipe()
              break;
          case 'sharerOn': 
              this.sharerOn = true
              this.builderPipe()
              break;
      }
  }
  customerPipe(){
      let pipe = [];
      pipe = this.allSlides.slice(0,8);
      pipe = pipe.concat(this.allSlides.slice(10,11));
      pipe = pipe.concat(this.allSlides[11])
      pipe = pipe.concat(this.allSlides[8])
      this.slides = pipe;
  }
  builderPipe(){
      this.slides = this.allSlides.slice(0,10);
  }
  saveRole(x){
      this.contact.role.id = x;
  }
  editContact(){
      let id = this.contact.id
      if(this.contact.first_name && this.contact.last_name){
          let contact = {
              first_name: this.contact.first_name,
              last_name: this.contact.last_name,
              email: this.contact.email,
              phone: this.contact.phone,
              role: this.contact.role.id,
              pipeline_position: this.contact.pipeline_position.id,
              tags: this.contact.tags
          }
          console.log(contact,' edited', this.contact)
              this.contactService.editContact(id, contact).subscribe(res =>{
                  this.events.publish('editContact');
                  this.dismiss()
              })
      }
  }

  //Tags
  getTags(){
    this.contactService.getTags().subscribe(res=>{
        this.tags = res;
        for(let ctag of this.contact.tags){
            for(let tag of this.tags){
                if(tag.id == ctag.id){
                    console.log(tag)
                    tag.on = true;
                }
            }
        }
    })
}
  openTags(){
    let modal = this.modalCtrl.create('page-add-tags', {tags: this.tags});
    modal.onDidDismiss(data => {
        console.log(data,'data')
        this.tags = data.taggy;
    })
    modal.present();
 }
 tag(x){
     this.contact.tags = [];
     for(let y of x){
         if(y.on){
             this.contact.tags.push(y.id);
         }
     }
 }


}
