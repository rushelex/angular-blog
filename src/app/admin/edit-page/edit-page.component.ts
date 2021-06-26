import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  post!: Post;

  submitted = false;

  uSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.postsService.getById(params.id)))
      .subscribe((post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        });
      });
  }

  ngOnDestroy() {
    this.uSub?.unsubscribe();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.uSub = this.postsService
      .update({
        ...this.post,
        title: this.form.value.title,
        text: this.form.value.text,
      })
      .subscribe(() => {
        this.submitted = false;
        this.alert.success('Пост был обновлён');
      });
  }
}
