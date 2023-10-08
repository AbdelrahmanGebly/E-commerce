import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
constructor(private _AllDataService:AllDataService){};
ngOnInit(): void {
  this.getData();
}
categories:any[] = [];
getData(){
  this._AllDataService.getData('categories').subscribe((response)=>{
    this.categories = response.data;
  })
}
}
