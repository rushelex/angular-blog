import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  pSub?: Subscription;

  dSub?: Subscription;

  searchStr: string = '';

  constructor(private postsService: PostsService, private alert: AlertService) {}

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.pSub?.unsubscribe();
    this.dSub?.unsubscribe();
  }

  removePostById(id?: Post['id']) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.alert.danger('Пост был удалён');
    });
  }
}
