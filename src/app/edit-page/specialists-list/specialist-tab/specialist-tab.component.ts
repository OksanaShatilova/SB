import {Component, Input} from '@angular/core';
import {Specialist} from '../../services/specialists.service';

@Component({
  selector: 'app-specialist-tab',
  templateUrl: './specialist-tab.component.html',
  styleUrls: ['./specialist-tab.component.scss']
})
export class SpecialistTabComponent {
  @Input() specialist: Specialist;
  @Input() currentSpecialist: Specialist;
  constructor() { }
}
