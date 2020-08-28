import React, { Component } from 'react';
import axios from 'axios';
import {postURL, userIDURL} from "../constants";
import { createProduct } from "../store/actions/createPost";
import { connect } from "react-redux";
import { Form, Input, InputNumber, Button } from 'antd';



class ProductCreate extends Component {

  state = {
    userID: '',
    title: '',
    price: '',
    slug: '',
    description: '',
    image: null,
    previews: []
  };


  handleFetchUserID = (token) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
      axios.get(userIDURL)
      .then(res => {
        this.setState({ userID: res.data.userID });
        console.log(this.state.userID)
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }; 

  handleFetchData = (token) => {
    this.setState({ loading: true });
    const { userID, title, price, slug, description, image } = this.state;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
        axios.post(postURL)
      .then(res => {
        this.setState({ previews: res.data, loading: false });
        console.log(this.state.previews)
      })
      .catch(err => {
        if (err.response.staus == 404){
          console.log(err.response)
        }
        this.setState({ error: err });
      });
  };


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('title', this.state.title);
    form_data.append('user', this.state.userID);
    form_data.append('slug', this.state.slug);
    form_data.append('price', this.state.price);
    form_data.append('description', this.state.description);

    const poster = {
      user: this.state.userID,
      title: this.state.title,
      price: this.state.price,
      slug: this.state.slug,
      description: this.state.description,
      image: this.state.image
    }
    this.props.createPOST(this.props.token, poster);

    console.log(this.props.username)
    console.log(this.state.userID)
    let url = 'http://localhost:8000/api/posts/';
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.post(postURL, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${this.props.token}`

      }
    })
    .then(res => {
          console.log(res.data);
          this.props.history.push("/shop")
        })
        .catch(err => console.log(err))
  };

//   handleVal = (values) => {
        
//     const userID = values['userID']
//     const title = values['title']
//     const price = values['price']
//     const slug = values['slug']
//     const description = values['description']
//     const image = values['image']
//     const previews = values['previews']

//     let form_data = new FormData();
//     form_data.append('image', this.state.image, this.state.image.name);
//     form_data.append('title', this.state.title);
//     form_data.append('user', this.state.userID);
//     form_data.append('slug', this.state.slug);
//     form_data.append('price', this.state.price);
//     form_data.append('description', this.state.description);

//     const poster = {
//       user: this.state.userID,
//       title: this.state.title,
//       price: this.state.price,
//       slug: this.state.slug,
//       discount_price:this.state.discount_price,
//       description: this.state.description,
//       image: this.state.image
//     }

//     this.props.createPOST(this.props.token, poster);

//     // this.props.history.push("/");

//     const poster = {
//       user: this.state.userID,
//       title: this.state.title,
//       price: this.state.price,
//       slug: this.state.slug,
//       description: this.state.description,
//       image: this.state.image
//     }

//     let url = 'http://localhost:8000/api/posts/';
//     axios.defaults.headers = {
//       "Content-Type": "application/json",
//       Authorization: `Token ${this.props.token}`
//     };
//     axios.post(postURL, form_data, {
//       headers: {
//         'content-type': 'multipart/form-data',
//         Authorization: `Token ${this.props.token}`

//       }
//     })
//     .then(res => {
//           console.log(res.data);
//           this.props.history.push("/shop")
//         })
//         .catch(err => console.log(err))

// };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.handleFetchUserID(this.props.token);
      this.handleFetchData(this.props.token)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.handleFetchUserID(newProps.token);
        this.handleFetchData(newProps.token)
      }
    }
  }

  render() {
    console.log(this.state.token);

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    
    const Demo = () => {
      const onFinish = values => {
        console.log(values);
      };
    }
    
    return (
        <>

<Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>Product Name</label>
      <input 
      placeholder='Search...'
      id='title' value={this.state.title} 
      onChange={this.handleChange} required
      />
    </Form.Field>

    <Form.Field>
      <input 
        placeholder='user' id='user'
        value={this.state.userID} 
        hidden onChange={this.handleChange} required
      />
    </Form.Field>

    <Form.Field>
      <label>Slug</label>
      <input 
        placeholder='slug' id='slug' value={this.state.slug} onChange={this.handleChange} required

      />
    </Form.Field>

    <Form.Field>
      <label>Price</label>
      <input 
        placeholder='price' id='price' value={this.state.price} onChange={this.handleChange} required
      />
    </Form.Field>

    <Form.Field>
      <label>Discount Price</label>
      <input 
      placeholder='discount_price' id='discount_price' value={this.state.discount_price} onChange={this.handleChange} required
      />
    </Form.Field>

    <Form.Field>
      <label>Description</label>
      <input 
      placeholder='description' id='description' value={this.state.description} onChange={this.handleChange} required
      />
    </Form.Field>

    <Form.Field>
      <label>Product Image</label>
      <input 
      type="file"
      id="image"
      accept="image/png, image/jpeg"  onChange={this.handleImageChange} required   
      />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>

        </>
        
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPOST: (token,poster) => dispatch(createProduct(token, poster))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCreate);
