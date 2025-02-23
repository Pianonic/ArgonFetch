import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'ArgonFetch';
  currentTheme: 'system' | 'light' | 'dark';

  constructor() {
    // Load saved theme preference or default to system
    this.currentTheme = (localStorage.getItem('theme') as 'system' | 'light' | 'dark') || 'system';
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    // Handle download logic here
  }

  toggleTheme(theme: 'system' | 'light' | 'dark') {
    this.currentTheme = theme;
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    if (theme === 'system') {
      this.setSystemTheme();
    } else {
      document.documentElement.setAttribute('sl-theme', theme);
      document.body.classList.toggle('sl-theme-dark', theme === 'dark');
      document.body.classList.toggle('sl-theme-light', theme === 'light');
    }
  }

  setSystemTheme() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = e.matches;
      document.documentElement.setAttribute('sl-theme', isDark ? 'dark' : 'light');
      document.body.classList.toggle('sl-theme-dark', isDark);
      document.body.classList.toggle('sl-theme-light', !isDark);
    };
    darkModeMediaQuery.addEventListener('change', setTheme);
    setTheme(darkModeMediaQuery);
  }

  ngOnInit() {
    // Apply saved theme on load
    this.toggleTheme(this.currentTheme);
  }
}
