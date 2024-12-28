import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})

export class EpisodeListComponent {
  episodes: any[] = [];
  currentPage: number = 1;
  searchName: string = '';


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEpisodes();
  }

  loadEpisodes(): void {
    let params = new HttpParams().set('page', this.currentPage.toString());
    if (this.searchName) {
      params = params.set('name', this.searchName);
    }

    this.http.get('https://localhost:7247/episodes', { params }).subscribe((data: any) => {
      this.episodes = data.results;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadEpisodes();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEpisodes();
    }
  }
}
