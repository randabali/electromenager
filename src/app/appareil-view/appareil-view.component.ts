import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  
  isAuth = false;

  lastUpdate = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout (
         () => {
        resolve(date);
        }, 2000
      );
    }
  )

appareils: any[];
appareilSubsciption: Subscription;

  constructor(private appareilService : AppareilService) {
    setTimeout(
        () => {
        this.isAuth = true;
      }, 4000
    );
  }
  ngOnInit(){
    this.appareilSubsciption = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      } 
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllume(){
    this.appareilService.switchOnAll();
  }

  onEteint(){
    this.appareilService.switchOffAll();
  }
}
