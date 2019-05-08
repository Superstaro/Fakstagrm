import React, { Component } from 'react'

class Pic extends Component{
  state = { src: this.props.src }

  handleError = () => {
    this.setState({ src: 'https://picsum.photos/id/1/300'})
  }

  render(){
    return(
      <img
        src={this.state.src}
        onError={this.handleError}
        alt="pic"
      />
    )
  }
}

export default Pic
