import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import _ from 'lodash';

const config = {

    apiKey: "AIzaSyCdj7u1xLT46ZQhA9ltXKwyUbPobDtkT8U",
    authDomain: "react-firebase-blog-53e3b.firebaseapp.com",
    databaseURL: "https://react-firebase-blog-53e3b.firebaseio.com",
    projectId: "react-firebase-blog-53e3b",
    storageBucket: "",
    messagingSenderId: "817815934028"
  };

  firebase.initializeApp(config);



class App extends Component {
constructor(props){
  super(props);
  this.state = {
    title: ' ',
    body: ' '
  };
  this.onInputChange = this.onInputChange.bind(this);
  this.onHandleSubmit = this.onHandleSubmit.bind(this);

}

componentDidMount() {
  firebase.database().ref('/posts').on('value', snapshot => {
    this.setState({
      posts: snapshot.val()
    });
  });
}

// render posts from firebase
renderPosts() {
  return _.map(this.state.posts, (post, key) => {
    return (
      <div key={key}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    );
  });
}

onInputChange(e){
  this.setState({
    [e.target.name]: e.target.value
  });
}

onHandleSubmit(e){
  e.preventDefault();
  const post = {
    title: this.state.title,
    body: this.state.body
  };
  firebase.database().ref('/posts').push(post);
  this.setState({
    title:'',
    body:''
  });
}

  render() {
    return (
      <div className="container">
      <br/>
        <form onSubmit={this.onHandleSubmit}>
        <div className="form-group">

          <input value={this.setState.title} type="text" name="title" placeholder="title" onChange={this.onInputChange} ref="title" />
          </div>
          <div className="form-group">
          <input value={this.setState.body} type="text" name="body" placeholder="Body" onChange={this.onInputChange} ref="body" />
          </div>
          <button className = "btn-btn-primary">Post</button>
        </form> 
        <br/>
        <div>{this.renderPosts()}</div> 
      </div>
    );
  }
}

export default App;
