import React, { Component } from "react";

export default class NewsItem extends Component {

    render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top p-1 " alt="..." style={{  height: "12rem" }}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}