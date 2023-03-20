import React, { Component } from "react";

export default class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, publishedAt, source } = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <span className="position-absolute top-0 start-1 badge rounded-pill bg-danger" >
            {source}</span>
          <img  src={imageUrl} className="card-img-top p-1 " alt="..." style={{ height: "12rem" }} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">Last updated at {publishedAt}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More...</a>
          </div>
        </div>

      </div>
    );
  }
}
