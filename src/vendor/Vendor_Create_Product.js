import React, { Component } from 'react'
import {Row, Col , List, Avatar ,Rate,Input ,
    Spin ,Card , Form, Button ,Select , DatePicker , Upload, message,notification} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined ,UploadOutlined  } from '@ant-design/icons'
import {postURL, userIDURL} from "../constants";
import { createProduct } from "../store/actions/createPost";

import axios from "axios";
import { connect } from "react-redux";

//import TemporaryDrawer from './Sidebar/SideNav'

const UserPost_url = 'https://theebs.pythonanywhere.com/stream/view_post/'

const Search = Input.Search;
const TextArea = Input.TextArea
const { Option } = Select;
const { RangePicker } = DatePicker;

const category_url = 'https://theebs.pythonanywhere.com/core_api/category_list/'

const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );



class New_Upload extends Component {

    state = {
        //Farm_Posts : [],
        //loading: false,
        //error: null ,
        userID: '',
        title: '',
        price: '',
        slug: '',
        description: '',
        image: null,
        previews: [],
        products: []
    }

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

    getFarmersProducts = (token) =>{
      this.setState({ loading: true });
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get('htttp://127.0.0.1:8000/api/f-items-list/')
        .then(res => {
          this.setState({ products: res.data, loading: false });
          console.log(this.state.products);

        }).catch(err => {
          this.setState({ error: err, loading: false });
          console.log(err);

        });
    }

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

  openNotification = (msg) => {
      notification.open({
        message: 'Notification Title',
        description:msg,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }

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
      form_data.append('image', this.state.image );//this.state.image.name
      form_data.append('title', this.state.title);
      form_data.append('user', this.state.userID);
      form_data.append('slug', this.state.slug);
      form_data.append('price', this.state.price);
      form_data.append('description', this.state.description);
      console.log(form_data);

      const poster = {
        user: this.state.userID,
        title: this.state.title,
        price: this.state.price,
        slug: this.state.slug,
        description: this.state.description,
        image: this.state.image
      }
      console.log(poster);

      this.props.createPOST(this.props.token, poster);

      console.log(this.props.username)
      console.log(this.state.userID)
      let url = 'htttp://127.0.0.1:8000/api/posts/';
      axios.post(postURL, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Token ${this.props.token}`

        }
      })
          .then(res => {
            console.log(res.data);
           // this.props.history.push("/products")
          })
          .catch(err => console.log(err))
    };

    componentDidMount() {
      if (this.props.token !== undefined && this.props.token !== null) {
        this.handleFetchUserID(this.props.token);
        this.getFarmersProducts(this.props.token)
      //  this.handleFetchData(this.props.token)
      }
    }

    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
          this.handleFetchUserID(newProps.token);
          this.getFarmersProducts(newProps.token)
        //  this.handleFetchData(newProps.token)
        }
      }
    }

render() {

  const { loading, error ,Farm_Posts, products} = this.state
  const {userID} = this.props
  console.log(this.state.userID);

  console.log(userID);

  return (
       <>
    <div className ="container py-4">
          <div className = "flex flex-wrapper">

             <div className="w-full md:w-4/12 ml-auto py-4 mr-auto px-4">
              <div className="base-card">
                  <Form  onFinish={this.handleSubmit}>
                      <Form.Item>
                        <h1 className="ant-form-text">Create Post</h1>
                         </Form.Item>

                     <Form.Item rules={[{ required: true }]}  name ="user">
                                <Input placeholder={this.state.userID}

                                 value={this.state.userID} id='user' enterButton  onChange={this.handleChange}   />
                     </Form.Item>
                     <Form.Item rules={[{ required: true }]}  name ="title">
                                <Input placeholder="Product or Service name"
                                 value={this.state.price} id='title' enterButton  onChange={this.handleChange}   />
                     </Form.Item>
                     <Form.Item rules={[{ required: true }]}  name ="slug">
                                <Input placeholder="slug" enterButton value={this.state.slug} id='slug' onChange={this.handleChange}   />
                     </Form.Item>
                     <Form.Item rules={[{ required: true }]} name ="xategory" >
                                <Select placeholder="Select a category">
                                    <Option value="Tuber">Tuber</Option>
                                </Select>

                      </Form.Item>

                      <Form.Item  rules={[{ required: true }]} name="description">
                          <TextArea placeholder="Description" value={this.state.description} rows={4} id='description' onChange={this.handleChange}  />
                          </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                            name ='price'>

                                <Input placeholder="Price" id='price' value={this.state.price} enterButton onChange={this.handleChange}  />

                            </Form.Item>

                          <Form.Item rules={[{ required: true }]} name="image">
                          <input  type="file" name="Post_Image1" id="image" onChange={this.handleImageChange} />
                          {/* onChange={this.FileSelected1} */}
                          </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                            </Form.Item>

                       </Form>

                  </div>
              </div>
          <div className="w-full md:w-6/12 ml-auto mr-auto px-4">

              <List itemLayout="vertical" size="large"
                    pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                    }}
                    dataSource={products}
                    footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                    }
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        // actions={[
                        // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        // ]}
                        extra={
                        <img
                            width={272}
                            alt="logo"
                            src={item.image}

                        />
                        }
                    >
                  <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={`/user_post_detail/${item.id}`}>{item.title}</a>}
                        description={item.description}
                        />
                        {item.description}
                    </List.Item>
                    )}
                />

                        </div>
                        </div>

                    </div>

                </>

            )
        }
}



const mapStateToProps = state => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
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
  )(New_Upload);
