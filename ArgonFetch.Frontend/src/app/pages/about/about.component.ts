import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutComponent {
  supportedPlatforms = [
    {
      name: 'YouTube',
      icon: 'youtube',
      features: ['Video downloads', 'Audio extraction', 'Playlist support', 'Quality selection']
    },
    {
      name: 'Spotify',
      icon: 'spotify',
      features: ['Track downloads', 'Playlist downloads', 'Album downloads']
    },
    {
      name: 'SoundCloud',
      icon: 'cloudy',
      features: ['Track downloads', 'Playlist support', 'High-quality audio']
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      features: ['Video downloads', 'GIF downloads', 'Image downloads']
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      features: ['Photo downloads', 'Video downloads', 'Story downloads', 'Reel downloads']
    },
    {
      name: 'TikTok',
      icon: 'tiktok',
      features: ['Video downloads', 'No watermark option', 'Audio extraction']
    }
  ];
} 