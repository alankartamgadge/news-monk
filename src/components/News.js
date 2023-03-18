import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    catagory: "general",
  };

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db8f74328e11444e920e42ff01a4c00f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    await this.setState({page: this.state.page + 1});
    this.updateNews();
  };

  handlePrevClick = async () => {
    await this.setState({page: this.state.page - 1});
    this.updateNews();
  };

  render() {
    const newArticles =
      !this.state.loading &&
      this.state.articles &&
      this.state.articles.map((element) => {
        return (
          <div
            className="col-md-4"
            key={element.url !== null ? element.url : "..."}
          >
            <NewsItem
              title={
                element.title !== null ? element.title.slice(0, 40) : "..."
              }
              description={
                element.description !== null
                  ? element.description.slice(0, 30)
                  : "..."
              }
              imageUrl={
                element.urlToImage !== null
                  ? element.urlToImage
                  : "https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png"
              }
              newsUrl={element.url !== null ? element.url : "..."}
              source={element.source !== null ? element.source.name : "..."}
              publishedAt={
                element.publishedAt !== null
                  ? new Date(element.publishedAt).toGMTString()
                  : "NA"
              }
            />
          </div>
        );
      });

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsMonk - Bulletine
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">{newArticles}</div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
