import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/core/note';
import { NoteServiceService } from 'src/app/shared/services/note-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  searchKey:string = '';
  noteId:string = '';
  addNoteSub:Subscription = new Subscription();
  removeNoteSub:Subscription = new Subscription();
  getAllSub:Subscription = new Subscription();
  notesData:Note[]=[]
  constructor(private _NoteServiceService:NoteServiceService){}
  
  addNoteForm:FormGroup = new FormGroup({
    title: new FormControl(null),
    content: new FormControl(null)
  })

  editNoteForm:FormGroup = new FormGroup({
    title: new FormControl(null),
    content: new FormControl(null)
  })

  ngOnInit(): void {
    this.getAllSub = this._NoteServiceService.allNotes().subscribe({
      next:(respo)=>{
        console.log(respo.notes);
        if(respo.notes){
          this.notesData = respo.notes
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  

  addNote(addNoteForm:FormGroup){
    console.log(addNoteForm.value);
    this.addNoteSub = this._NoteServiceService.addNoteService(addNoteForm.value).subscribe({
      next:(respo)=>{
        console.log(respo);
        this.ngOnInit();
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

  updateNote(editNoteForm:FormGroup){
    console.log(editNoteForm.value);
    this.addNoteSub = this._NoteServiceService.updateNoteService(editNoteForm.value,this.noteId).subscribe({
      next:(respo)=>{
        console.log(respo);
        this.ngOnInit();
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }


  removeNote(){
    this.removeNoteSub = this._NoteServiceService.removeNoteService(this.noteId).subscribe({
      next:(respo)=>{
        console.log(respo);
        this.ngOnInit();
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
    
  }


  getId(id:string):void{
    this.noteId = id 
    console.log(this.noteId);
  }

  ngOnDestroy(): void {
    this.addNoteSub.unsubscribe();
    this.getAllSub.unsubscribe();
    this.removeNoteSub.unsubscribe();
  }
}
