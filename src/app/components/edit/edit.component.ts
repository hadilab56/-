import { Component } from '@angular/core';
import {FormGroup , FormControl, Validators} from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  categories: string[] = ['Plafond', 'Murs', 'Eclairage'];
  constructor(private product:ProductService , private router : ActivatedRoute) {} ;
  message : boolean = false ;
  editProduct = new FormGroup({
    categorie: new FormControl('',[Validators.required]),
    title: new FormControl('' ,[ Validators.required , Validators.minLength(3), Validators.pattern(/^[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*)*$/)]),
    image : new FormControl('' , [ Validators.required ]) ,
    description : new FormControl('' , [ Validators.required]) ,
    price : new FormControl('' , [ Validators.required])
  });

  ngOnInit(): void {
  this.product.getProductByid(this.router.snapshot.params['id']).subscribe((res:any)=>{
  this.editProduct = new FormGroup({
    categorie : new FormControl(res['categorie']),
    title : new FormControl(res['title']) ,
    image : new FormControl(res['image']),
    description : new FormControl(res['description']),
    price : new FormControl(res['price']) })
  });
  }
  editData(){
  this.product.editProduct(this.router.snapshot.params['id'], {...this.editProduct.value as Product }).subscribe((res)=>{
    this.message = true ;
  })
  }

  removeMessage(){
    this.message=false;
  }


}
