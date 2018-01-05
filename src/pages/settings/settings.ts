import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { ContactService } from '../../services/contact.service';
import { Contacts } from '@ionic-native/contacts';


@IonicPage({
  name: 'page-settings'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [
    UserService,
    ContactService
  ]
})
export class SettingsPage {

  
  user={
    first_name: '',
    last_name: '',
    zipcode: '',
    doterra_id: '',
    phone: '',
    upline_email:''
  }
  email;
  importOff
  contactAdd ={
    current: 0,
    total: 0
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public alert: AlertController,
    public contactService: ContactService,
    public contactCtrl: Contacts,
  ) {
  }

  ionViewDidLoad() {
    this.getName();
  }
  getName(){
      this.userService.getUserInfo().subscribe(res => {
        console.log(res)
        this.user = res.data
        this.email = res.email;
      })
  }
  addContacts(){
    this.openAlert()
  }
  openAlert(){
    let alert = this.alert.create({
        title: 'Are you ready to import all your contacts?',
        buttons: [
            {
                text: 'Not Now',
                role: 'cancel',
                handler: () => {
                }
            },
            {
                text: 'Import',
                handler: () => {
                    this.importContacts()
                }
            }
        ]
    })
    alert.present();
  }
  importContacts(){
    this.importOff = 'Importing';
    this.contactCtrl.find(['*']).then(data => {
      let allImportedContacts = [];
      this.contactAdd.total = data.length;
      for(let x of data){
        if (x.phoneNumbers) {
        console.log(x.phoneNumbers, x.phoneNumbers[0])
        if(x.name.givenName && x.name.familyName && x.phoneNumbers[0]){
          let contact ={
            first_name: x.name.givenName,
            last_name: x.name.familyName,
            phone: x.phoneNumbers[0].value,
            pipeline_position: 1,
            role: 1,
          }
          this.contactAdd.current++
          allImportedContacts.push(contact)
        } else { 
          console.log('Not enough info for contact')
          this.contactAdd.current++ 
        }
        }
      }
      this.contactService.addContactArr(allImportedContacts).subscribe(res=>{
        this.importOff = 'Contacts Imported!';
      }, err=>{
        alert(err)
      })
      if(data){
        this.alerty();
      }
      else { alert('no contacts?')}
    }).catch(err => {
      alert(err + 'Error');
    })
  }
  alerty(){
    let alert = this.alert.create({
      title: 'Importing Contacts',
      message: 'Your contacts are being imported, this may take a minute.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
      },
      ]
    })
    alert.present();
  }

}
