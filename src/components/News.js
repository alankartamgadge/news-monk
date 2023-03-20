import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    catagory: "general",
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalize(this.props.category)}`
  }

  capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
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


  fetchMoreData = async () => {
    this.setState({page: this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db8f74328e11444e920e42ff01a4c00f&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };


  render() {
    const newArticles =
      
      this.state.articles &&
      this.state.articles.map((element) => {
        console.log(element.urlToImage);
        return (
          <div className="col-md-4" key={element.url !== null ? element.url : "..."} >
            <NewsItem
              title={element.title !== null ? element.title.slice(0, 40) : "..."}
              description={element.description !== null  ? element.description.slice(0, 30)  : "..."}
              imageUrl={element.urlToImage !== null? element.urlToImage: "https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png"}
              newsUrl={element.url !== null ? element.url : "..."}
              source={element.source !== null ? element.source.name : "..."}
              publishedAt={element.publishedAt !== null ? new Date(element.publishedAt).toGMTString(): "NA"}
            />
          </div>
        );
      });

    return (
      <>
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsMonk - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.totalResults && this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles && this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">

              {newArticles}
            </div>
          </div>
        </InfiniteScroll>
       
      </>
    );
  }
}
