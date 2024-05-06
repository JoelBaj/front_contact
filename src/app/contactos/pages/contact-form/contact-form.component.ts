import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{
  
  constructor(
    private fb:FormBuilder, 
    private contactService:ContactService,
    private router:Router,
    private route:ActivatedRoute){}

  form!: FormGroup;
  contact!: Contact;
  errors: string[] =[];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.contactService.get(parseInt(id))
      .subscribe(contact => {
        this.contact = contact;
        this.form = this.fb.group({
          name:[contact.name,[Validators.required]],
          email:[contact.email,[Validators.required, Validators.email]],
        });
      })
    }else{
      this.form = this.fb.group({
        //  name:['',[]],
        //  email:['',[]],
        name:['',[Validators.required]],
          email:['',[Validators.required,Validators.email]]
      })
    }
    
  }

  save(){
    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const contactForm = this.form!.value;
    let request: Observable<Contact>

    if(this.contact){
     request = this.contactService.update(this.contact.id, contactForm);
     
    }else{
      request = this.contactService.create(contactForm);
    }
    request
      .subscribe({
        next: ()=>{
          this.errors = [];
          this.router.navigate(['/contacto/contact'])
        },
        error:response =>{
          this.errors = response.error.errors
        }
      });
    }
}
