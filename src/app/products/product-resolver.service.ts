import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const id: number = +route.paramMap.get('id');

        // Error handling
        if (isNaN(id)) {
            const message = `Product id was not a number: ${id}`;
            console.error(message);
            return of({product: null, error: message});
        }
        return this.productService.getProduct(id).pipe(
            map(product => ({product: product})),
            catchError(error => {
                const message = `Retrieval eror: ${error}`;
                console.log(message);
                return of({product: null, error: message});
            })
        );
    }
}
