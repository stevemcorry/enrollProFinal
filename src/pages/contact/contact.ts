import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, Slides, Events, NavController, ModalController } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';


@IonicPage({
  name: 'page-contact'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [ContactService]
})
export class ContactPage {

  //Camera
  lastImage: any = null;
  // top / setup
  @ViewChild('choosePipe') choosePipe: Slides;
  contact:any = {};
  timerCheck;
  activeSlide;

   //IconList
  customerOn = false;
  builderOn = false;
  sharerOn = false;
  slides = [];
  allSlides = [
      { name: 'Imported', id: 1, text: "The contacts you've identified as your prospects. Decide who of these you want to be in your Top 45. " },
      { name: 'Names List', id: 2, text: "The contacts you've identified as your prospects. Decide who of these you want to be in your Top 45." },
      { name: 'Top 45', id: 3, text: "Your prioritized prospects. Prepare to expose and invite each in a personalized and effective way by assigning actions on their contact page." },
      { name: 'Exposed', id: 4, text: "Your exposed prospects. Track your prospects exposure (e.g. samples, story, media, literature, building) to product and/or business opportunity by clicking appropriate icons." },
      { name: 'Committed', id: 5, text: "Your committed invitees. Track those who have committed to attending/experiencing a presentation." },
      { name: 'Attended', id: 6, text: "Those who have attended a presentation and require follow up for enrollment (preferably within 72 hrs)." },
      { name: 'Enrolled', id: 7, text: "Your enrolled prospects. Track on-boarding: schedule Lifestyle Overview, send enrollment kit email drip campaign, invite to applicable Facebook group(s), invite to continuing education/event(s) by clicking appropriate icons." },
      { name: 'Lifestyle Overview', id: 8, text: "Your new enrollees who have received their Lifestyle Overview. Track LRP enrollments by clicking the LRP icon." },
      { name: 'Business Overview', id: 9, text: "Your prospective builders who have experienced a Business Overview presentation." },
      { name: 'Launch To Elite', id: 11, text: "Your new builders. Track their progress by clicking icons as they complete PIPES activities." },
      { name: 'Support & Education', id: 12, text: "Your customers. Support with Wellness Consults, community involvement (e.g. customer Facebook group), communication regarding continuing education, promotions, events, invite to share and build." },
      { name: 'Interested', id: 13, text: "Your customers who have become builder prospects who need to be invited/scheduled for a Business Overview." },
  ];
  timer;
  //toggles
  toggles;
  downArrowOn:boolean;
  togTimer
  //tags
  tags
  //actions
  actions
  leftBox = false;
  rightBox = true;
  complete = 0;
  constructor( 
    public params: NavParams,
    public viewCtrl: ViewController,
    public contactService: ContactService,
    public events: Events,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    if(this.params.get('contact')){
        this.contact = this.params.get('contact');
    }
    this.events.subscribe('actionAdded', ()=>{
        this.getSpecificContact()
    })
    this.events.subscribe('editContact', ()=>{
        this.getSpecificContact();
    })
  }
  dismiss(){
      this.viewCtrl.dismiss();
  }
    
  classCheck(x){
    let action = x.action_type.id
    if( action === 1){
      return 'email'
    } else if( action === 2){
      return 'text'
    } else if( action === 3){
      return 'call'
    }
  }

  addAction(){
    this.navCtrl.push('page-add-action', {contact: this.contact});
  }
  openEdit(){
      let modal = this.modalCtrl.create('page-edit-contact', {contact: this.contact});
      modal.present()
  }
  specificAction(action){
      action.contact = {
          first_name: this.contact.first_name,
          last_name: this.contact.last_name
      }
      this.navCtrl.push('page-specific-action', {action: action});
  }
  getSpecificContact(){
    this.contactService.getSpecificContact(this.contact.id).subscribe(res => {
        this.contact = res;
        this.setToggles(res.pipeline_actions);
        this.tags = res.tags;
        this.actions = res.actions;
        if(res.role.id == 1){
            this.changeRole('builderOn')
        } else if(res.role.id == 2){
            this.changeRole('customerOn')
        } else if(res.role.id == 3){
            this.changeRole('sharerOn')
        }
        if(this.contact.pipeline_position.id >= 8){
            this.pickSlide(this.contact.pipeline_position)
        } else {
            this.choosePipe.slideTo(this.contact.pipeline_position.id - 1, 1000);
        }
        setTimeout(()=>{
            this.timerCheck = true;
        },2500)
      });
  }
  setToggles(toggles){
    let tog = [ toggles[0], toggles[1], toggles[2], toggles[4], toggles[5], toggles[23], toggles[24], toggles[6], toggles[7], toggles[8], toggles[9], toggles[3], toggles[17], toggles[18], toggles[19], toggles[20], toggles[21], toggles[22], toggles[10], toggles[11], toggles[12], toggles[13], toggles[14], toggles[15], toggles[16]]
    this.toggles = tog;
  }
  pickSlide(id){
      for(let slide of this.slides){
          if(slide.id == id.id){
              this.choosePipe.slideTo(this.slides.indexOf(slide),2000);
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

  //Icon List
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
  saveRole(x){
    let props = {
        role: x
    }
    this.contactService.editContact(this.contact.id ,props).subscribe(res=>{
    },err=>{
        console.log(err)
    })
  }

  //Pipes/slides
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

  ionViewDidLoad() {
    this.slides = this.allSlides;
    this.getSpecificContact()
  }
  slideChange() {
    clearTimeout(this.timer)
    if(!this.timerCheck){  
        return
    }
    this.timer = setTimeout( () => { this.advancePipe(this.activeSlide.id)},1000)
  }
  advancePipe(x){
      let pipe = x;
      let send = {
          pipeline_position: pipe
      }
      let id = this.contact.id;
      this.contactService.editContact(id, send).subscribe(res => {
          this.events.publish('pipeAdvance');
          this.events.publish('points');
        }, err => {
            console.log(err, 'cannot change pipe')
        });
  }
  //Toggles
  saveToggle(toggle){
    clearTimeout(this.togTimer);
    toggle.status=!toggle.status;
    this.togTimer = setTimeout(()=>{
        this.saveActions()
    },1500);
  }
  saveActions(){
    let actionsPush = [];
    let actionsObj;
    for(let action of this.contact.pipeline_actions){
      action = {
        pipeline_action_id: action.id,
        status: action.status
      }
      actionsPush.push(action);
      actionsObj = {
        pipeline_actions: actionsPush
      }
    }
    this.contactService.editContact(this.contact.id, actionsObj).subscribe(res=>{
    },err=>{
      console.log(err,'error')
      alert('Could not save toggle')
    })
  }

}
