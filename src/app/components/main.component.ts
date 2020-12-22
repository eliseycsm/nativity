import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  form: FormGroup
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: this.fb.control('')
    })
  }

  processForm(){
    let message = this.form.get('message').value
    this.router.navigate(['/card'], {
      queryParams: {message}
    })
  }
  //2 problems
  //1. our text needs to be sent from form to card 
  //cardscene is an ng service but gameScene is not part of ng => soln: use injector
  //create global injector obj to hold 
  // friend to receive card has to access /card directly but only angular can do the view processing
  //2. we want to send the card to the person but the msg needs to come from form page
  //soln: use query string to append the msg to the card url 


}
