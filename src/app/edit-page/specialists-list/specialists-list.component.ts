import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Specialist} from '../services/specialists.service';

@Component({
  selector: 'app-specialists-list',
  templateUrl: './specialists-list.component.html',
  styleUrls: ['./specialists-list.component.scss']
})
export class SpecialistsListComponent implements OnInit {
  allSpecialists: Specialist[];
  addedSpecialists: Specialist[] = [];
  hiddenList: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.hiddenList = true;
    this.route.data.subscribe(data => {
      this.allSpecialists = data.specialists;
    });
  }

  closePopup() {
    this.hiddenList = true;
  }

  addSpecialist(specialist: Specialist) {
    this.addedSpecialists.push(specialist);
    console.log(specialist);
    this.hiddenList = true;
  }

  openNewSpecialistsList() {
    this.hiddenList = false;
  }
}
