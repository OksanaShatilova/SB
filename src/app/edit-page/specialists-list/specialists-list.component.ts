import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Specialist} from '../services/specialists.service';
import {Shop} from '../services/shops.service';

@Component({
  selector: 'app-specialists-list',
  templateUrl: './specialists-list.component.html',
  styleUrls: ['./specialists-list.component.scss']
})
export class SpecialistsListComponent implements OnInit {
  availableSpecialists: Specialist[];
  addedSpecialists: Specialist[] = [];
  currentSpecialist: Specialist | null;
  hiddenList = true;
  @Output() onHide: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCurrentSpecialistChanged: EventEmitter<Specialist> = new EventEmitter<Specialist>();
  @Output() onCurrentSpecialistShopDelete: EventEmitter<Shop> = new EventEmitter<Shop>();
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onHide.emit(false);
    this.route.data.subscribe((data) => {
      this.availableSpecialists = data.specialists.map(specialist => {
        return {
          id: specialist.id,
          fullName: specialist.fullName,
          photo: specialist.photo,
          shops: []
        };
      });
    });
  }

  closePopup() {
    this.hiddenList = true;
    if (this.addedSpecialists.length) {
      this.onHide.emit(true);
    }
  }

  addSpecialist(addingSpecialist: Specialist) {
    this.addedSpecialists.push(addingSpecialist);
    this.currentSpecialist = this.addedSpecialists[this.addedSpecialists.length - 1];
    this.onCurrentSpecialistChanged.emit(this.currentSpecialist);
    this.hiddenList = true;
    this.onHide.emit(true);
    this.availableSpecialists = this.availableSpecialists.filter((specialist) => {
      return specialist.id !== addingSpecialist.id;
    });
  }
  openNewSpecialistsList() {
    this.hiddenList = false;
    this.onHide.emit(false);
  }

  deleteSpecialist(deletingSpecialist: Specialist) {
    this.addedSpecialists = this.addedSpecialists.filter((specialist, index) => {
      if (specialist.id === deletingSpecialist.id) {
        this.currentSpecialist = this.addedSpecialists[index - 1] || null;
        this.onCurrentSpecialistChanged.emit(this.currentSpecialist);
      }
      if (!this.currentSpecialist) {
        this.onHide.emit(false);
      }
      return specialist.id !== deletingSpecialist.id;
    });
    this.availableSpecialists.push(deletingSpecialist);
  }

  deleteShop(shop: Shop) {
    this.onCurrentSpecialistShopDelete.emit(shop);
  }
}
