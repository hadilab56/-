import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(private product : ProductService) {} ;

  products  : Array<Product> = [];


  ngOnInit():void{
    this.product.getAllProducts().subscribe((res : any) =>{
      console.log(sessionStorage.getItem('role'))

       this.products = res ;
    },(error) =>{
      console.error();
    });
  }

  deleteProduct(id:any){
    this.product.deleteProduct(id).subscribe((res)=>{
      this.ngOnInit();
    },(error)=>{
      console.error('error',error);

    }
    )
  }



}
