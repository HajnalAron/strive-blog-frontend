import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: "",
      category: "",
      readTimeValue: "",
      readTimeUnit: "minutes",
      authorName: "",
      authorAvatar: "",
      picture: {},
      postId: "",
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ content: value });
  }

  componentDidUpdate() {
    if (this.state.isLoading === true) {
      this.uploadPicture();
    }
  }

  uploadPost = async (e) => {
    const postData = {
      content: this.state.content,
      title: this.state.title,
      category: this.state.category,
      readTime: {
        readTimeUnit: this.state.readTimeUnit,
        readTimeValue: this.state.readTimeValue
      },
      author: {
        authorName: this.state.authorName,
        authorAvatar: this.state.authorName
      }
    };
    console.log(this.state);
    e.preventDefault();
    try {
      const resp = await fetch(backendUrl + "/blogposts/", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
      });
      if (resp) {
        let fetchedPosts = await resp.json();
        this.setState({ postId: fetchedPosts.id, isLoading: true });
      }
    } catch (error) {}
  };

  uploadPicture = async () => {
    if (this.state.picture) {
      let picture = new FormData();
      picture.append("coverPic", this.state.picture);
      try {
        const resp = await fetch(
          `${backendUrl} + /blogposts/ + ${this.state.postId}`,
          {
            method: "POST",
            body: picture
          }
        );
        if (resp) {
          let response = await resp.json();
          console.log(response);
        }
      } catch (error) {}
    }
  };

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={(e) => this.uploadPost(e)}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              size="lg"
              placeholder="Title"
              required
            />
          </Form.Group>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={this.state.category}
              onChange={(e) => this.setState({ category: e.target.value })}
              size="lg"
              placeholder="Category"
              required
            />
          </Form.Group>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              value={this.state.authorName}
              onChange={(e) => this.setState({ authorName: e.target.value })}
              size="lg"
              placeholder="Author Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Author Avatar</Form.Label>
            <Form.Control
              value={this.state.authorAvatar}
              onChange={(e) => this.setState({ authorAvatar: e.target.value })}
              size="lg"
              placeholder="Author Avatar Link"
              required
            />
          </Form.Group>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Read Time</Form.Label>
            <Form.Control
              value={this.state.readTimeValue}
              onChange={(e) => this.setState({ readTimeValue: e.target.value })}
              size="lg"
              placeholder="Read Time"
              required
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              onChange={(e) => this.setState({ readTimeUnit: e.target.value })}
              size="lg"
              as="select"
            >
              <option>minutes</option>
              <option>hours</option>
              <option>days</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.content}
              onChange={this.handleChange}
              className="new-blog-content"
              required
            />
          </Form.Group>
          <input
            type="file"
            onChange={(e) => {
              this.setState({ picture: e.target.files[0] });
            }}
          />
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
