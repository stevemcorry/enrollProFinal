import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides, Events } from 'ionic-angular';

import { PipelineService } from '../../services/pipeline.service'
import { ContactService } from '../../services/contact.service'


@IonicPage({
  name: 'page-pipeline'
})
@Component({
  selector: 'page-pipeline',
  templateUrl: 'pipeline.html',
  providers: [
    PipelineService,
    ContactService
  ]
})
export class PipelinePage {

  @ViewChild('pipeSlider') pipeSlider: Slides;

  title:string = "Names List";
  currentPipeTitle:string = '';
  slides
  allSlides = this.pipeService.allSlides;
  nextOn;
  timer;
  pipeType;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public pipeService: PipelineService,
    public contactService: ContactService,
    public events: Events,
  ) {
    this.events.subscribe('pipeSelect', () =>{
    })
    this.events.subscribe('contactAdded', () => {
      this.setBuilder();
    })
    this.events.subscribe('actionAdded', (x) => {
      console.log(x)
      this.setBuilder();
    })
    this.events.subscribe('pipeAdvance', (x) => {
      this.setBuilder();
    })
    this.events.subscribe('editContact', () => {
      this.setBuilder();
      //this.getPipelinePositions(0)
    });
    this.events.subscribe('leadsPipe', () =>{
      this.setBuilder();
    })
    this.events.subscribe('enrollmentsPipe', () =>{
      this.setBuilder();
      this.goToSlide(2)
    })
    this.events.subscribe('customerPipe', () =>{
      this.pipeType = 'Customer';
      this.title = 'Customers';
      this.setCustomer();
      this.goToSlide(7)
    })
    this.events.subscribe('builderPipe', () =>{
      this.pipeType = 'Builder';
      this.title = 'Builders';
      this.setBuilder();
      this.goToSlide(7)
    })
  }

  ionViewDidLoad() {
    console.log(this.allSlides,'all')
    this.setBuilder();
    this.slides = this.pipeService.allSlides.slice(0,9);
    this.slides = this.slides.concat(this.pipeService.allSlides[10])
    this.pipeSlider.initialSlide = 3;
  }

  pipelineChoose(){
    let modal = this.modalCtrl.create('page-pipeline-choose');
    modal.present();
  }
  builderChoose(){
    let modal = this.modalCtrl.create('pipeline-choose-builder');
    modal.present();
  }
  openAddModal() {
    if(this.pipeSlider._activeIndex < 2){
      let modal = this.modalCtrl.create('add-nameslist');
      modal.present();
    } else {
      let modal = this.modalCtrl.create('page-add-contact');
      modal.present();
    }
  }
  openModal(prospect) {
    this.navCtrl.push('page-contact', {contact : prospect})
  }
  goToSlide(x) {
    if(x == 101){
      this.builderChoose()
    } else {
      this.pipeSlider.slideTo(x, 500);
    }
  }
  scrollFunction($event, group){
    var scroll = $event.srcElement.scrollTop
    var offset = $event.srcElement.offsetHeight
    var height = $event.srcElement.scrollHeight;
    if(height - 50 < scroll + offset){
      this.getNextPage(group.next_page_url, group.id)
    }
  }
  contactColor(prosp){
    if(prosp == 0) {return 'yellowText'} 
    else if(prosp == 1) {return 'greyText';} 
    else if(prosp == 2) {return 'blueText';}
    else if(prosp == 3) {return 'redText';}
  }
  dotColor(prosp){
    if(prosp == 0) { return 'yellowDot' } 
    else if(prosp == 1) { return 'greyDot' } 
    else if(prosp == 2) { return 'blueDot' } 
    else if(prosp == 3) { return 'redDot' }
  }
  toggleCheck(toggle, contactToggles){
    for(let cont of contactToggles){
      if(toggle.id === cont.id){
        if(cont.status){
          return "toggle" + cont.id + "On";
        }
      }
    }
  }
  saveToggle(toggle, contact, id){
    clearTimeout(this.timer);
    for(let cont of contact){
      if(toggle.id === cont.id){
        cont.status=!cont.status;
        this.timer = setTimeout(()=>{
          this.saveActions(contact, id)
        },1500);
      }
    }
  }
  saveActions(contact, id){
    let actionsPush = [];
    let actionsObj;
    for(let action of contact){
      action = {
        pipeline_action_id: action.id,
        status: action.status
      }
      actionsPush.push(action);
      actionsObj = {
        pipeline_actions: actionsPush
      }
    }
    this.contactService.editContact(id, actionsObj).subscribe(res=>{
    },err=>{
      console.log(err,'error')
      alert('Could not save toggle')
    })
  }

  setBuilder(){
    for(let i = 1; i <= 9; i++){
      this.getSpecificPipe(i)
    }
    this.getSpecificPipe(11);
    this.slides = this.allSlides.slice(0,9);
    this.slides = this.slides.concat(this.allSlides[10])
    this.currentPipeTitle = "Builders";
  }
  setCustomer(){
    let custPipeline = this.allSlides;
    custPipeline = custPipeline.slice(0,8);
    custPipeline = custPipeline.concat(this.allSlides[11]);
    custPipeline = custPipeline.concat(this.allSlides[12]);
    custPipeline = custPipeline.concat(this.allSlides[8]);
    let customerList = [1,2,3,4,5,6,7,8,12,13,9]
    for(let cust of customerList){
      this.getSpecificPipe(cust);
    }
    this.slides = custPipeline;
    this.currentPipeTitle = "Customers";
  }
  getNextPage(url, id){
    if(this.nextOn || !url){
      return
    };
    this.nextOn = true;
    this.pipeService.getNextPipelinePage(url).subscribe(res=>{
      for(let x of res.contacts){
        x.pipeline_position = res.id - 1
      }
      this.allSlides[res.id - 1].contacts = this.allSlides[res.id - 1].contacts.concat(res.contacts);
      this.allSlides[res.id - 1].next_page_url = res.next_page_url;
      for(let slide of this.slides){
        if(res.id == slide.id){
          slide.next_page_url = res.next_page_url
        }
      }
      this.nextOn = false;
    })
  }
  getSpecificPipe(x){
    this.pipeService.getSpecificPipeline(x).subscribe(res=>{
      console.log(res)
      this.allSlides[res.id -1] = res
      for(let i = 0; i < this.slides.length; i++){
        if(this.slides[i].id === res.id){
          this.slides[i] = res;
        }
      }
      //console.log(res.contacts,res.id)
    })
  }

  slideChange(){
    if(this.pipeSlider._activeIndex < 2){
      this.title = 'Names List'
    } else if(this.pipeSlider._activeIndex >= 2 && this.pipeSlider._activeIndex <= 6){
      this.title = "Prospects"
    } else if (this.pipeSlider._activeIndex === 5){
    } else if (this.pipeSlider._activeIndex == 6){
      this.title = this.currentPipeTitle;
    } else if (this.pipeSlider._activeIndex > 6){
      this.title = this.currentPipeTitle;
      if(this.pipeSlider.length() == 8 ){
        this.title = this.currentPipeTitle;
        this.builderChoose();
        this.pipeSlider.slideTo(6)
      } else if(this.pipeSlider._activeIndex == 7  && this.pipeSlider._previousIndex == 6){
        this.title = this.currentPipeTitle;
        this.builderChoose();
      }
      if(this.pipeSlider._activeIndex >= this.pipeSlider.length() - 1){
        this.pipeSlider.slideTo(this.pipeSlider.length() - 2);
      }
    }
  }

}
