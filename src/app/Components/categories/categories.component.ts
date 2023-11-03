import { Component } from '@angular/core';
import { Categories, Category } from 'src/app/core/Interfaces/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  //variables
  categoriesList: Category[] = []
  loading: boolean = false

  constructor(private _CategoryService: CategoryService) { }

  //get all categories while initiating
  ngOnInit(): void {
    this.loading = true
    this._CategoryService.getAllCategories().subscribe({
      next: (data: Categories) => {
        this.loading = false
        //console.log(data);
        this.categoriesList = data.data
      }
    })
  }
}
