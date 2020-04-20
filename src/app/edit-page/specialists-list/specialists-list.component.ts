import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Specialist} from '../services/specialists.service';
import {Shop} from '../services/shops.service';
import {Result} from '../edit-page.module';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-specialists-list',
  templateUrl: './specialists-list.component.html',
  styleUrls: ['./specialists-list.component.scss']
})

export class SpecialistsListComponent implements OnInit, OnDestroy {
  availableSpecialists: Specialist[];
  addedSpecialists: Specialist[] = [];
  currentSpecialist: Specialist;
  hiddenList = true;
  routeSubscription: Subscription
  @Input() allShops: Shop[];
  @Output() onHide: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCurrentSpecialistChanged: EventEmitter<Specialist> = new EventEmitter<Specialist>();
  @Output() onCurrentSpecialistShopDelete: EventEmitter<Shop> = new EventEmitter<Shop>();
  @Output() onCurrentSpecialistDelete: EventEmitter<Specialist> = new EventEmitter<Specialist>();
  @Output() onAllSpecialistListUpdate: EventEmitter<Result> = new EventEmitter<Result>()
  @Output() onShopsReset: EventEmitter<void> = new EventEmitter<void>();
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onHide.emit(false);
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.availableSpecialists = data.specialists.map(specialist => {
        return {
          id: specialist.id,
          fullName: specialist.fullName,
          photo: specialist.photo,
          shops: []
        };
      });
    });
    this.updateResultObject();
  }
  updateResultObject() {
    this.onAllSpecialistListUpdate.emit({
      availableSpecialists: this.availableSpecialists,
      addedSpecialists: this.addedSpecialists
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
    this.updateResultObject();
    this.onShopsReset.emit();
  }

  openNewSpecialistsList() {
    this.hiddenList = false;
    this.onHide.emit(false);
  }

  deleteSpecialist(deletingSpecialist: Specialist) {
    this.addedSpecialists = this.addedSpecialists.filter((specialist, index) => {
      if (specialist.id === deletingSpecialist.id) {
        specialist.shops.length = 0;
        if (index > 0) {
          this.currentSpecialist = this.addedSpecialists[index - 1];
          this.onCurrentSpecialistDelete.emit(this.currentSpecialist);
        } else if (index === 0 && this.addedSpecialists.length > 1) {
          this.currentSpecialist = this.addedSpecialists[index + 1];
          this.onCurrentSpecialistDelete.emit(this.currentSpecialist);
        } else {
          this.currentSpecialist = null;
          this.onCurrentSpecialistDelete.emit();
        }
      }
      this.onCurrentSpecialistChanged.emit(this.currentSpecialist);
      if (!this.currentSpecialist) {
        this.onHide.emit(false);
      }
      return specialist.id !== deletingSpecialist.id;
    });
    this.availableSpecialists.unshift(deletingSpecialist);
    this.updateResultObject();
  }

  deleteShop(shop: Shop) {
    this.onCurrentSpecialistShopDelete.emit(shop);
    this.updateResultObject();
  }

  selectSpecialist(specialist: Specialist) {
    this.currentSpecialist = specialist;
    this.onCurrentSpecialistChanged.emit(this.currentSpecialist);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
