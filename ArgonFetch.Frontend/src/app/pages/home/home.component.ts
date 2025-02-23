import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  rating: number = 0;

  handleSubmit(event: Event) {
    event.preventDefault();
    // Handle download logic here
  }

  handleRating(event: any) {
    this.rating = event.detail.value;
    // Here you could send the rating to your backend
    console.log('New rating:', this.rating);
  }
} 