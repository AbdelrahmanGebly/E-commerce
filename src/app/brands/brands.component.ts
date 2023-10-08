import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{
  constructor(private _AllDataService:AllDataService){};
  ngOnInit(): void {
    this.getData();
  }
  brands:any[] = [];
  getData(){
    this._AllDataService.getData('brands').subscribe((data)=>{
      this.brands = data.data;
    })
  }
}
