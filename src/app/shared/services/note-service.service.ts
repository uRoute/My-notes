import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor(private _HttpClient:HttpClient) { }
  header:any = {
    token:'3b8ny__'+localStorage.getItem('_UserToken')
  }

  allNotes():Observable<any>{
    return this._HttpClient.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{headers:this.header})
  }

  addNoteService(form:object):Observable<any>{
    return this._HttpClient.post(`https://note-sigma-black.vercel.app/api/v1/notes`,form,{headers:this.header})
  }

  updateNoteService(form:object,id:string):Observable<any>{
    return this._HttpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,form,{headers:this.header})
  }
  
  removeNoteService(id:string):Observable<any>{
    return this._HttpClient.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{headers:this.header})
  }

}
