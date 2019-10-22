import { Component, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply.model';
import { RepliesStoreFacade } from 'src/app/store/replies/replies.store-facade';
import { UsersStoreFacade } from 'src/app/store/users/users.store-facade';
import { User } from '../models/user.model';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../models/post.model';
import { PostsStoreFacade } from 'src/app/store/posts/posts.store-facade';
import { CommentsStoreFacade } from 'src/app/store/comments/comments.store-facade';
import { Comment } from '../models/comment.model';

@Component({
    selector: 'reply',
    templateUrl: './reply.component.html',
    styles: ['ul{margin-top:5px;}']
})
export class ReplyComponent {
    user: Observable<User>;
    @Input('replies') replies;
    @Input() idComment;
    @Input() idPost;
    faThumbsUp = faThumbsUp;
    constructor(private userFacade: UsersStoreFacade, private replyFacade: RepliesStoreFacade) {
        this.user = this.userFacade.getUser();
    }
    create(reply) {
        console.log(`hey`)
        this.replyFacade.create({ content: reply, idPost: this.idPost, idComment: this.idComment });
        if (this.replies.length > 1) {
            this.replies = [...this.replies, { content: reply }];
        }
        else {
            this.replies = [this.replies, { content: reply }]
        }
    }
    like(id) {
        for (let re of this.replies) {
            if (re._id === id) {
                const reply = re;
                reply.idPost = this.idPost;
                reply.idComment = this.idComment;
                this.replyFacade.like(reply);
                if (reply.likes) {
                    reply.likes = parseInt(reply.likes) + 1;
                } else {
                    reply.likes = 1;
                }
                this.replies[this.replies.indexOf(re)] = reply;
            }
        }
    }
}
