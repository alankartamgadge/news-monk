import React, { Component } from 'react'
import spinner from './spinner.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className='my-6 text-center'>
        <img src={spinner} alt="" />
      </div>
    )
  }
}

export default Spinner