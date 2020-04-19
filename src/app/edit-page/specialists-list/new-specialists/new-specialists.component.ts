import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Specialist} from '../../services/specialists.service';

@Component({
  selector: 'app-new-specialists',
  templateUrl: './new-specialists.component.html',
  styleUrls: ['./new-specialists.component.scss']
})
export class NewSpecialistsComponent {
  @Input() specialists: Specialist[];
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelect: EventEmitter<Specialist> = new EventEmitter<Specialist>();
  specialist: Specialist;
  constructor() { }

  selectSpecialist(specialist: Specialist) {
    this.onSelect.emit(specialist);
  }

  closePopup() {
    this.onClose.emit();
  }
}
