import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TrackerService } from '../../services/tracker.service';
@IonicPage({
  name: 'page-tracker'
})
@Component({
  selector: 'page-success-tracker',
  templateUrl: 'success-tracker.html',
  providers: [
    TrackerService
  ]
})
export class SuccessTrackerPage {

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
    public trackerService: TrackerService
  ) {
  }

  ionViewDidLoad() {
    this.getGoalTotals();
    console.log('ionViewDidLoad SuccessTrackerPage');
  }
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
