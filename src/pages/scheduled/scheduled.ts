import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { MarketService } from '../../services/market.service';

@IonicPage({
  name: 'page-scheduled'
})
@Component({
  selector: 'page-scheduled',
  templateUrl: 'scheduled.html',
  providers: [ContactService, MarketService]
})
export class ScheduledPage {

  contacts;
  recomFilter=0;
  scheduledJobs = [];
  scheduledLoading = 'Loading...'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contactService: ContactService,
    public marketService: MarketService,
  ) {
  }

  ionViewDidLoad() {
    this.getContacts()
    console.log('ionViewDidLoad ScheduledPage');
  }
  getContacts(){
    this.contactService.getContacts().subscribe(res => {
        this.contacts = res;
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
      this.recomFilter += 1;
      if(!this.scheduledJobs[0]){
          this.scheduledLoading = 'No Scheduled Communication Today!';
      }
    })
  }
  deleteScheduledJob(id){
    this.marketService.deleteScheduledJob(id.id).subscribe(res=>{
      id.delete = true;
      this.recomFilter += 1;
    })
  }
  

}
