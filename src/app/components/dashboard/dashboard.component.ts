import { Component } from '@angular/core';
import { Producto } from 'src/app/interface/Producto';
import { ProductoServiceService } from 'src/app/service/producto-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  productos: Producto[];
  currentPage = 1;
  pageSize = 10;

  constructor(private productoService: ProductoServiceService) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  private obtenerProductos() {
    this.productoService.obtenerProductos()
      .subscribe(datos => {
        this.productos = datos;
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  totalPages() {
    return Math.ceil(this.productos.length / this.pageSize);
  }

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.productos.slice(startIndex, endIndex);
  }
}
