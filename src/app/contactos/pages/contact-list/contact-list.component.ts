import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
 
  constructor(private contactService:ContactService){}
  
  contacts:Contact[] = [];
  
  ngOnInit(): void {
    this.loadAll();
  }
  loadAll(){
    this.contactService.list().subscribe(contacts=>{
      this.contacts = contacts 
    })
  }

  deleteContact(contact: Contact){
    this.contactService.delete(contact.id)
    .subscribe(()=>{
      this.loadAll();
    })
  }
}
