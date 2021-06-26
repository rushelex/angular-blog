import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FbCreateResponse, Post } from '../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Record<string, any>>(`${environment.FB_DB_URL}/posts.json`).pipe(
      map((response) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      }),
    );
  }

  getById(id: Post['id']) {
    return this.http.get<Post>(`${environment.FB_DB_URL}/posts/${id}.json`).pipe<Post>(
      map((post) => ({
        ...post,
        id,
        date: new Date(post.date),
      })),
    );
  }

  create(post: Post) {
    return this.http.post<FbCreateResponse>(`${environment.FB_DB_URL}/posts.json`, post).pipe<Post>(
      map((response) => ({
        ...post,
        id: response.name,
        date: new Date(post.date),
      })),
    );
  }

  remove(id: Post['id']) {
    return this.http.delete<void>(`${environment.FB_DB_URL}/posts/${id}.json`);
  }

  update(post: Post) {
    return this.http.patch<Post>(`${environment.FB_DB_URL}/posts/${post.id}.json`, post);
  }
}
