
class Post {
  constructor(id, image_url, user_id, caption) {
    this.id = id;
    this.image_url = image_url;
    this.user_id = user_id;
    this.caption = caption;
    this.comments = []
  }

  addComments(comments) {
    // this.comments = []
    for(let c of comments) {
      this.comments.push( new Comment(c.user_id, c.content))
    }
    // console.log(this.comments)
  }
}
