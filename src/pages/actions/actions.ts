import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, ModalController, AlertController, Events } from 'ionic-angular';
import {ActionService } from '../../services/actions.service';


@IonicPage({
  name: 'page-actions'
})
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
  providers: [ActionService]
})
export class ActionsPage {

  //dimmer
  showDim = false;

  //actions
  actions:any = [];
  actionsLoading = 'Loading...';
  contacts = [];
  newAction = {
    "complete": 1
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionService: ActionService,
    public alert: AlertController,
    public events: Events
  ) {
    this.events.subscribe('actionAdded', ()=>{
      this.getActions();
    })
  }

  //Dimmer
  closeFab(fab: FabContainer): void {
    if (fab !== undefined) {
      fab.close();
    }
  }
  //FAB
  addContact(){
    let modal = this.modalCtrl.create('page-add-contact');
    modal.present();
  }
  chooseActionContact(){
    let modal = this.modalCtrl.create('page-add-action');
    modal.present();
  }
  //Actions
  getActions(){
    this.actionService.getActions().subscribe(res => {
      console.log(res)
      let data: any = {}
      data = res;
      let actions = [];
      for(let action of data){
        if(!action.complete){
          actions.push(action)
        }
      }
      this.actions = actions;
      this.actions.sort((a:any, b:any) => {
        a = a.due_date.substring(0,10);
        b = b.due_date.substring(0,10);
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      })
      // this.getService.getContacts(this.currentKey).subscribe(contacts => {
      //   this.contacts = contacts;
      // })
      this.actionsLoading = "No actions for today!"
    }, Error=>{
      console.log(Error)
    })
  }
  animate(action){
    let id = action.animate;
    let skip = action.skip;
    if(id == true){
      return true
    } else if (skip) {
      return true
    } else {
      return false;
    }
  }
  openSpecificAction(action){
    this.navCtrl.push('page-specific-action', {action: action});
  }
  classCheck(x){
    let action = x.action_type.id;
    let xDate = x.due_date;
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        const date = [year, month, day].join('');
    let a = xDate.slice(0,4)
    let b = xDate.slice(5,7)
    let c = xDate.slice(8,10)
    let z = a+b+c;
    if( action === 1){
      if(z > date){
        return 'email'
      } else if (z == date){
        return 'emailBlue'
      } else if (z < date){
        return 'emailRed'
      }
    } else if( action === 2){
      if(z > date){
        return 'text'
      } else if (z == date){
        return 'textBlue'
      } else if (z < date){
        return 'textRed'
      }
    } else if( action === 3){
      if(z > date){
        return 'call'
      } else if (z == date){
        return 'callBlue'
      } else if (z < date){
        return 'callRed'
      }
    } else if( action === 4){
      if(z > date){
        return 'meet'
      } else if (z == date){
        return 'meetBlue'
      } else if (z < date){
        return 'meetRed'
      }
    }
  }
  dateCheck(x){
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        const date = [year, month, day].join('');
    let a = x.slice(0,4)
    let b = x.slice(5,7)
    let c = x.slice(8,10)
    let z = a+b+c;
    if(z > date){
      return 'grey'
    } else if (z == date){
      return 'blue'
    } else if (z < date){
      return 'red'
    }
  }
  doneCheck(x, action){
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        const date = [year, month, day].join('');
    let a = x.slice(0,4)
    let b = x.slice(5,7)
    let c = x.slice(8,10)
    let z = a+b+c;
    if(!action){
      return
    }
    if(z > date){
      return 'grey'
    } else if (z == date){
      return 'blue'
    } else if (z < date){
      return 'red'
    }
  }
  completeAction(action){
    let id = action.id
    let contact = action.contact;
      setTimeout(()=>{
        this.actionService.completeAction(id, this.newAction).subscribe(res => {
          this.getActions();
          this.openAlert(contact)
        })
      }, 500)
  }
  openAlert(contact){
    let alert = this.alert.create({
      title: 'Add another action?',
      message: 'Would you like to add another action for ' + contact.first_name + '?',
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
                  contact_name: contact.first_name + ' ' + contact.last_name,
                  contact : contact.id
              }

            });
          }
        }
      ]
    })
    alert.present();
}


  ionViewDidLoad() {
      this.getActions()
  }

}
