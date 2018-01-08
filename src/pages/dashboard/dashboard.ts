import { Component } from '@angular/core';
import { IonicPage, NavController, Events, NavParams, FabContainer, ModalController, AlertController } from 'ionic-angular';
import { ActionService } from '../../services/actions.service';
import { ContactService } from '../../services/contact.service';
import { MarketService } from '../../services/market.service';
import { TrackerService } from '../../services/tracker.service';

@IonicPage({
  name: 'page-dashboard'
})
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [ActionService, ContactService, MarketService, TrackerService]
})
export class DashboardPage {

  action = {
    action_type: {
      name: ''
    },
    complete: 0,
    contact: {
      first_name: ''
    },
    due_date: '',
    id: 0,
  }
  actions = [];
  actionsLoading = 'Loading...'
  newAction = {
    "complete": 1
  }

  recommendations = [];
  recomActions = [
    {
      name: 'Email',
      id: 1
    },
    {
      name: 'Text',
      id: 2
    },
    {
      name: 'Call',
      id: 3
    },
    {
      name: 'Meet',
      id: 4
    }
  ];
  recomFilter = 0;

  contacts = [];
  scheduledJobs = [];
  scheduledLoading = 'Loading...'

  committed = {
    actual: 0,
    goal: 0
  };
  enrolled = {
    actual: 0,
    goal: 0
  };
  oils = {
    actual: 0,
    goal: 0
  };
  presentation = {
    actual: 0,
    goal: 0
  };
  top = {
    actual: 0,
    goal: 0
  };
  goals = [];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionService: ActionService,
    public alert: AlertController,
    public events: Events,
    public contactService: ContactService,
    public marketService: MarketService,
    public trackerService: TrackerService
  ) {
    this.events.subscribe('actionAdded', ()=>{
      this.getActions();
    })
  }

  ionViewDidLoad() {
    this.getActions();
    this.getRecommendations();
    this.getContacts();
    this.getGoalTotals();
  }
  closeFab(fab: FabContainer): void {
    if (fab !== undefined) {
      fab.close();
    }
  }
  addContact(){
    let modal = this.modalCtrl.create('page-add-contact');
    modal.present();
  }
  chooseActionContact(){
    this.navCtrl.push('page-add-action');
  }
  openSpecificAction(action){
    this.navCtrl.push('page-specific-action', {action: action});
  }
  animate(id){
    if(id == true){
      return true
    } else {
      return false
    }
  }
  classCheck(x){
    let action = x.action_type.id
    let date = (new Date()).toISOString().slice(0,10).replace(/-/g,"")
    let a = x.due_date.slice(0,4)
    let b = x.due_date.slice(5,7)
    let c = x.due_date.slice(8,10)
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
      return '#768189'
    } else if (z == date){
      return '#1A9199'
    } else if (z < date){
      return '#E55F61'
    }
  }
  getActions(){
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        const date = [year, month, day].join('-')+ ' 23:59:59';
      this.actionService.getActions().subscribe(res => {
        this.actions = [];
          res = res.sort((a:any, b:any) => {
            a = new Date(a.due_date);
            b = new Date(b.due_date);
            return a - b;
          })
          for(let action of res){
              if(!action.complete){
                // if(this.actions.length < 5 && action.due_date !< date){
                //     this.actions.push(action);
                // } else { return }
                if(action.due_date !< date){
                  this.actions.push(action);
              } else { return }
              }
          }
          !this.actions[0] ? this.actionsLoading = 'No Actions!' : 'Loading...';
      })
  }
  completeAction(action){
    let id = action.id
      setTimeout(()=>{
        this.actionService.completeAction(id, this.newAction).subscribe(res => {
          this.getActions();
          this.openAlert(action)
        })
      }, 500)
  }
  skipAction(id){
    setTimeout(()=>{
      this.actionService.deleteAction(id).subscribe(res => {
        this.getActions();
      })
    }, 200)
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
            this.navCtrl.push('page-add-action', {recommendation: contact});
          }
        }
      ]
    })
    alert.present();
}

//Recommendations

getRecommendations(){
  this.recommendations = [];
  for(let i = 1; i < 14; i++){
    if(i !== 10){
      this.getRecommendation(i)
    }
  }
}
getRecommendation(id){
  this.actionService.getRecommendations(id).subscribe(res => {
    for(let recom of res){
        recom.action_type =this.recomActions[recom.action_type]
        recom.action_type ? '' : recom.action_type = { name: 'Email',id: 1 };
        this.recommendations.push(recom)
    }
    this.recomFilter += 1;
})
}
recommendedActionCheck(id){
  if(id === 1){
    return 'emailBlue'
  } else if(id === 2){
    return 'textBlue'
  } else if(id === 3){
    return 'callBlue'
  } else if(id === 4){
    return 'meetBlue'
  }
}
addRecommendedAction(action){
  this.navCtrl.push('page-add-action', {'recommendation': action});
}
finishRecommendation(rec){
  let recom = {
    "contact_id": rec.contact.id,
    "recommended_actions_id": rec.recommended_actions_id      
}
  this.actionService.completeRecommendation(recom).subscribe(res=>{
    rec.delete = true;
  })
}
openRecomAlert(recom){
    let alert = this.alert.create({
        title: "Complete recommended task for " + recom.contact.first_name + "?",
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Save',
                handler: () => {
                    recom.done = true;
                    this.addAction(recom);
                }
            }
        ]
    })
    alert.present();
}
addAction(recom){
  recom.animate = true;
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        const date = [year, month, day].join('-') + ' 23:59';
    let action = { 
        "action_type": recom.action_type.id,
        "contact": recom.contact.id,
        "due_date": date,
        "notes": recom.notes,
        "complete": 1
    }
    this.actionService.addAction(action).subscribe(res => {
        this.finishRecommendation(recom)
    })
}

//Scheduled Jobs

getContacts(){
  this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
      this.getRecommendations();
      this.getScheduledJobs();
  })
}
  
getScheduledJobs(){
  this.marketService.getScheduledJobs().subscribe(res => {
    for(let job of res){
      let name = '';
      for(let to of job.to){
          for(let contact of this.contacts){
              if(contact.id === to){
                  let pre = contact.first_name + ' ' + contact.last_name + ' ';
                  name = pre + name;
              }
          }
      }
      job.to = name;
      let date = job.scheduled_at.substring(0,10);
      let time = job.scheduled_at.substring(11,16);
      if(time < '01:00'){
          time = 12 + time.substring(2,6) + ' AM';
      } else if(time < '12:00'){
          time = time + ' AM'
      } else {
          time = (time.substring(0,2) - 12) + time.substring(2,5)  + ' PM'
      }
      date = date.split('-');
      date = date[1] + '/' + date[2] + '/' + date[0].substring(2,4);
      job.scheduled_date = date;
      job.scheduled_time = time;
    }
    this.scheduledJobs = res;
    if(!this.scheduledJobs[0]){
        this.scheduledLoading = 'No Scheduled Communication Today!';
    }
  })
}
deleteScheduledJob(id){
  this.marketService.deleteScheduledJob(id.id).subscribe(res=>{
    id.delete = true;
    this.recomFilter += 1;
    console.log(res)
  })
}

 //Goals

 width(x){
  if(x.actual === 0){
    return {'border-top':'0px solid transparent'}
  } else {
    if(x.goal == 5){
      if(x.acutal == 1){
        return {
          'border-top': '10px',
          'border-right': '7px',
          'border-left': '7px'
        }
      } else if(x.actual == 2){
        return {
          'border-top': '15px solid #f14d49',
          'border-right': '10px solid transparent',
          'border-left': '10px solid transparent'
        }
      } else if(x.actual == 3){
        return {
          'border-top': '20px solid #f14d49',
          'border-right': '15px solid transparent',
          'border-left': '15px solid transparent'
        }
      } else if(x.actual == 4){
        return {
          'border-top': '25px solid #f14d49',
          'border-right': '17px solid transparent',
          'border-left': '17px solid transparent'
        }
      } else if(x.actual == 5){
        return {
          'border-top': '30px solid #f14d49',
          'border-right': '20px solid transparent',
          'border-left': '20px solid transparent'
        }
      }
    }else{
      let width = x.actual/x.goal;
      width = width * 100;
      return {
        'width': 'calc(' + width + '% + 40px)'
      }
    }
  }
}
allGoals(){
  this.trackerService.getGoals().subscribe(res => {
      if(res){
        this.committed.actual =res.standard.committed_to_presentation_actual;
        this.committed.goal =res.standard.committed_to_presentation_goal;

        this.enrolled.actual =res.standard.enrolled_actual;
        this.enrolled.goal =res.standard.enrolled_goal;

        this.oils.actual =res.standard.experienced_eo_actual;
        this.oils.goal =res.standard.experienced_eo_goal;

        this.presentation.actual =res.standard.experienced_presentation_actual;
        this.presentation.goal =res.standard.experienced_presentation_goal;

        this.top.actual =res.standard.top_45_actual;
        this.top.goal =res.standard.top_45_goal;
      }
    });
}

getGoalTotals(){
  this.goals = [];
  this.allGoals();
}

}
