import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController, Slides } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';

@IonicPage({
  name: 'page-add-contact'
})
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
  providers: [ContactService]
})
export class AddContactPage {

  @ViewChild('choosePipe') choosePipe: Slides;
  contact = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    pipeline_position: 1,
    role: 1,
    tags: []
  };
  phone = '';
  slides;
  allSlides = [
      { name: 'Imported', id: 1 },
      { name: 'Names List', id: 2 },
      { name: 'Top 45', id: 3 },
      { name: 'Exposed', id: 4 },
      { name: 'Committed', id: 5 },
      { name: 'Attended', id: 6 },
      { name: 'Enrolled', id: 7 },
      { name: 'Lifestyle Overview', id: 8 },
      { name: 'Business Overview', id: 9 },
      { name: 'Launch To Elite', id: 11 },
      { name: 'Support & Education', id: 12 },
      { name: 'Interested', id: 13 },
    ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contactService: ContactService,
    public viewCtrl: ViewController,
    public events: Events,
    public alert: AlertController,
  ) {
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }

  setPipe(){
      this.contact.pipeline_position = this.choosePipe.getActiveIndex() + 1;
  }
  setPipes(role){
      if(role !== 'customer'){
          this.slides = this.allSlides.slice(0,10);
        } else {
          let pipe = [];
          pipe = this.allSlides.slice(0,8);
          pipe = pipe.concat(this.allSlides.slice(10,11));
          pipe = pipe.concat(this.allSlides[11])
          pipe = pipe.concat(this.allSlides[8])
          this.slides = pipe;
        }
  }
  getIndex(x){
      if(this.choosePipe.getActiveIndex() > this.choosePipe.length() -3){
          this.choosePipe.slideTo(this.choosePipe.length() -3)
      }
      if(this.choosePipe.getActiveIndex() == this.slides.indexOf(x)){
          return true;
      } else {
          return false;
      }
  }

  addContact(contact){
      if(contact.first_name && contact.last_name){
          contact.phone ? contact.phone = this.phone.replace(/\D/g,''): '';
          console.log(contact)
          this.contactService.addContact(this.contact).subscribe((res) => {
              // this.contact = {
              //     first_name: '',
              //     last_name: '',
              //     phone: '',
              //     email: '',
              //     pipeline_position: 0,
              //     role: 1,
              //     tags: []
              // };
              console.log(res,'contactAdded')
              this.events.publish('contactAdded');
              this.dismiss();
              this.openAlert(res.id);
          });
      } else {
          let alert = this.alert.create({
              title: 'Please Fill Out all the Info',
              buttons: ['OK']
          })
          alert.present();
      }
  }

  formatPhone(){
    let input = this.phone.replace(/\D/g,'');

    // Trim the remaining input to ten characters, to preserve phone number format
    input = input.substring(0,10);

    // Based upon the length of the string, we add formatting as necessary
    var size = input.length;
    if(size == 0){
            input = input;
    }else if(size < 4){
            input = '('+input;
    }else if(size < 7){
            input = '('+input.substring(0,3)+') '+input.substring(3,6);
    }else{
            input = '('+input.substring(0,3)+') '+input.substring(3,6)+' - '+input.substring(6,10);
    }
    this.phone = input; 
}

openAlert(id){
  let alert = this.alert.create({
    title: 'Contact Added',
    message: 'Would you like to add an action for ' + this.contact.first_name + '?',
    buttons: [
        {
            text: 'Not Now',
            role: 'cancel',
            handler: () => {
            }
        },
        {
            text: 'Add Action',
            handler: () => {
                this.navCtrl.push('page-add-action', {
                    recommendation: {
                        contact_name: this.contact.first_name + ' ' + this.contact.last_name,
                        contact : id
                    }

                });
            }
        }
      ]
    })
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

}
