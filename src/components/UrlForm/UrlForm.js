import React, { Component } from 'react';
import { updateAPI } from '../../apiCalls';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: '',
      urls: []
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newURL = {
      'long_url': this.state.urlToShorten,
       'title': this.state.title
    }
      updateAPI(newURL)
        .then(result => {
          this.setState(prevState => ({
            title: "",
            urlToShorten: '',
            urls: [...prevState.urls, result]
          }))
          console.log(result)
        })
        .catch(error => {
          console.log(error)
          alert("Sorry, there seems to have been an error, try again")
    })
  }

  render() {
    return (
      <form className='form-container'>
        <input
        className='titleInput'
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          className='urlInput'
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
