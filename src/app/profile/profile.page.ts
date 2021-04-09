import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  empData: Array<any>;
  item:any;
  emp_email: string;
  emp_id: any;
  emp_nid: any;
  emp_fname: any;
  emp_lname: any;
  emp_phone: any;

  empForm: FormGroup;

  validation_messages = {
    'fname': [
      { type: 'required', message: 'fname is required.' }
    ],
    'lname': [
      { type: 'required', message: 'lname is required.' }
    ],
    'nid': [
      { type: 'required', message: 'national id is required.' },
    ],
    'phone': [
      { type: 'required', message: 'phone is required.' },
    ],
    'email': [
      { type: 'required', message: 'email is required.' },
    ]
  };

  constructor(
    private firebase: FirebaseService,
    private afauth: AngularFireAuth,
    private router: Router,
    private data: DataService,
    private afs: AngularFirestore,
    private toastr: ToastController,
    private fb: FormBuilder,
   

  ) { }

  ngOnInit() {
    this.afauth.user.subscribe(res => {
      this.emp_email = res.email;
      this.emp_id = res.uid;
      
      
    });

    this.currentEmp();
    //this.createForm();
  }

  currentEmp() {

    this.firebase.searchEmp(this.emp_email)
      .subscribe(result => {
        this.empData = result;
      })
      this.createForm();
  }

  createForm() {
    this.empForm = this.fb.group({
      fname: [this.emp_fname,Validators.required],
      lname: [this.emp_lname,Validators.required],
      nid: [this.emp_nid,Validators.required],
      email: [this.emp_email,Validators.required],
      phone: [this.emp_phone,Validators.required]
    });
  }

  onSubmit(value){
    value.email = this.emp_email;
    this.firebase.updateEmp(this.emp_id, value)
    .then(
      res => {
        this.router.navigate(['/informations']);
      }
    )
  }
  signout() {
    this.afauth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }
  mainpage() {
    this.router.navigate(["home"]);
  }
  info() {
    this.router.navigate(["informations"]);
  }
  about() {
    this.router.navigate(["about"]);
  }
  contact() {
    this.router.navigate(["contact"]);
  }
  services() {
    this.router.navigate(["services"]);
  }
  permits() {
    this.router.navigate(["permits"]);
  }
  profile() {
    this.router.navigate(["profile"]);
  }

}