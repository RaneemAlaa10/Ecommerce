import { Component } from '@angular/core';
import { Brands, brand } from 'src/app/core/Interfaces/brand';
import { BrandService } from 'src/app/core/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  //variables
  brandsList: brand[] = [] //store all brands
  loading: boolean = false 

  constructor(private _BrandService: BrandService) { }

  //load all brands while initiating the component
  ngOnInit(): void {
    this.loading = true
    this._BrandService.getAllBrands().subscribe({
      next: (data: Brands) => {
        this.loading = false
       // console.log(data);
        this.brandsList = data.data
      }
    })
  }
}
