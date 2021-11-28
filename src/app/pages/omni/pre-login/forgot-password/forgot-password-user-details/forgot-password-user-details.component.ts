import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password-user-details',
  templateUrl: './forgot-password-user-details.component.html',
  styleUrls: ['./forgot-password-user-details.component.scss']
})
export class ForgotPasswordUserDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 

}
@Output() nextEvent = new EventEmitter<number>();

submit(){
  this.nextEvent.next(1);
}

}
