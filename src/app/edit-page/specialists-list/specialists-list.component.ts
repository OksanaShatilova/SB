import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Specialist} from '../services/specialists.service';
import {map} from 'rxjs/operators';
import {Shop} from '../services/shops.service';

@Component({
  selector: 'app-specialists-list',
  templateUrl: './specialists-list.component.html',
  styleUrls: ['./specialists-list.component.scss']
})
export class SpecialistsListComponent implements OnInit {
  availableSpecialists: Specialist[];
  availableShops: Shop[];
  addedSpecialists: Specialist[] = [];
  currentSpecialist: Specialist | null;
  hiddenList: boolean;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.hiddenList = true;
    this.route.data.pipe(map((response) => {
     response.specialists.map(specialist => {
        return {
          id: specialist.id,
          fullName: specialist.fullName,
          photo: specialist.photo,
          shops: []
        };
      });
     return response;
    })).subscribe((data) => {
      this.availableShops = data.shops;
      this.availableSpecialists = data.specialists;
    });
  }

  closePopup() {
    this.hiddenList = true;
  }

  addSpecialist(addingSpecialist: Specialist) {
    this.addedSpecialists.push(addingSpecialist);
    this.hiddenList = true;
    this.currentSpecialist = addingSpecialist;
    this.availableSpecialists = this.availableSpecialists.filter((specialist) => {
      return specialist.id !== addingSpecialist.id;
    });
  }
  openNewSpecialistsList() {
    this.hiddenList = false;
  }

  deleteSpecialist(deletingSpecialist: Specialist) {
    this.addedSpecialists = this.addedSpecialists.filter((specialist, index) => {
      if (specialist.id === deletingSpecialist.id) {
        this.currentSpecialist = this.addedSpecialists[index - 1] || null;
      }
      return specialist.id !== deletingSpecialist.id;
    });
    this.availableSpecialists.push(deletingSpecialist);
  }
}
