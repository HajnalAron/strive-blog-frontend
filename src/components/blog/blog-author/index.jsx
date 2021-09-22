import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
export default class BlogAuthor extends Component {
  render() {
    const {
      author: { authorName, authorAvatar }
    } = this.props;
    return (
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={authorAvatar} roundedCircle />
        </Col>
        <Col>
          <div>by</div>
          <h6>{authorName}</h6>
        </Col>
      </Row>
    );
  }
}
