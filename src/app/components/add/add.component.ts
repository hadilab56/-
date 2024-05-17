import { Component } from '@angular/core';
import {FormGroup , FormControl, Validators} from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  categories: string[] = ['Plafond', 'Murs', 'Eclairage'];
  constructor(private product:ProductService) {} ;
  message : boolean = false ;
  addProduct = new FormGroup({
    categorie: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*)*$/)]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required])
  });
  addData(){
    const postData  ={ ...this.addProduct.value }
    this.product.addProduct(postData as Product).subscribe(( res  )=>{
      this.message = true ;
      this.addProduct.reset( {} );
    });
  }

  removeMessage(){
    this.message=false;
  }



}
