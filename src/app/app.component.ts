import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from './core/services/product.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root', // Removed selector was a mistake in previous edit attempt? Step 166 removed it. Trying to keep it consistent. Wait, step 166 removed it in the diff? No, step 166 diff showed removal. I'll put it back. Original had it.
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected readonly title = signal('Shivcart');
  categories: string[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getCategories().subscribe((cats: string[]) => {
      this.categories = cats;
    });
  }
}
