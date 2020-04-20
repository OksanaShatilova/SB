import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Specialist} from '../../services/specialists.service';

@Component({
  selector: 'app-specialist-info',
  templateUrl: './specialist-info.component.html',
  styleUrls: ['./specialist-info.component.scss']
})
export class SpecialistInfoComponent {
  @Input() currentSpecialist: Specialist;
  @Output() onDelete: EventEmitter<Specialist> = new EventEmitter<Specialist>();
  constructor() { }

  deleteSpecialist(specialist: Specialist) {
    this.onDelete.emit(specialist);
  }

}
