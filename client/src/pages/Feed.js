import React, { Component } from 'react'
import Pic from '../components/Pic'
import InfiniteScroll from 'react-infinite-scroller'

class Feed extends Component{
  state = { posts: [], page: 0, hasMore: false }

  componentDidMount() {
    const { page } = this.state
    this.fetchPosts(page)
  }

  fetchPosts = page => {
    fetch(`/posts?page=${page}`)
      .then(response => response.json())
      .then(data => this.setState({
          posts: this.state.posts.concat(data.posts),
          page: data.page,
          hasMore: data.page < data.totalPages
        })
      )
  }

  render(){
    return(
      <>
        <div id="posts">
          <InfiniteScroll
            pageStart={0}
            loadMore={() => { this.fetchPosts(this.state.page + 1) }}
            hasMore={this.state.hasMore}
            loader={<div className="loader">Loading ...</div>}
            threshold={400}
          >
            {
              this.state.posts.map(post => (
                <div key={post.id} className="post">
                  <Pic src={post.photo} />
                  <div>{post.text}</div>
                </div>
              ))
            }
          </InfiniteScroll>
        </div>
      </>
    )
  }
}

export default Feed
