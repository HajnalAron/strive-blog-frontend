import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { backendUrl } from "../../../Utilities/config";
import BlogItem from "../blog-item";
export default class BlogList extends Component {
  state = {
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
  componentDidMount() {
    console.log("mount");
    this.getPosts();
  }
  render() {
    return (
      <Row>
        {this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
