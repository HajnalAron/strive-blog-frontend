import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author";
import { backendUrl } from "../../Utilities/config";
import "./styles.css";
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
    posts: []
  };

  getPosts = async () => {
    try {
      const resp = await fetch(backendUrl + "/blogposts/", {
        method: "GET"
      });
      if (resp) {
        let fetchedPosts = await resp.json();
        console.log(fetchedPosts);
        this.setState({ posts: fetchedPosts });
      }
    } catch (error) {}
  };

  deletePost = async () => {
    console.log(this.props.match.params.id);
    console.log(backendUrl);
    try {
      const resp = await fetch(
        backendUrl + /blogposts/ + this.props.match.params.id,
        {
          method: "DELETE"
        }
      );
      if (resp) {
        this.setState({ isLoading: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    console.log(backendUrl);
    console.log(this.props.match.params.id);
    await this.getPosts();
    const { id } = this.props.match.params;
    console.log(this.state.posts);
    const blog = this.state.posts.find((post) => post.id.toString() === id);
    console.log(blog);
    if (blog) {
      this.setState({ blog, loading: false });
    } else {
      this.props.history.push("/404");
    }
  };

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.coverPic} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              {blog.author && (
                <div className="blog-details-author">
                  <BlogAuthor author={blog.author} />
                </div>
              )}
              <div className="blog-details-info">
                <div>{new Date(blog.createdAt).toLocaleDateString()}</div>
                <div>{`${blog.readTime.readTimeValue} ${blog.readTime.readTimeUnit} read`}</div>
              </div>
            </div>
            <button
              className={"btn btn-danger"}
              onClick={() => {
                this.deletePost();
              }}
            >
              Delete Post
            </button>
            <Link to={`/edit/${this.props.match.params.id}`}>
              <button className={"btn btn-primary mx-3"}>Edit Post</button>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
