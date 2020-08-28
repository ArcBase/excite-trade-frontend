import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
    Container,
    Dimmer,
    Header,
    Icon,
    Image,
    Label,
    Loader,
    Table,
    Button,
    Message,
    Segment
} from "semantic-ui-react";
import {
    addToCartURL,
    orderSummaryURL,
    orderItemDeleteURL,
    orderItemUpdateQuantityURL
} from "../constants";  
import { fetchCart } from "../store/actions/cart";

class OrderSummary extends React.Component {
  state = {
    data: null,
    error: null,
    loading: false
  };


  handleFetchOrder = (token) => {
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios.get(orderSummaryURL)
      .then(res => {
        this.props.refreshCart(token);
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        if (err.response.status == 404) {
          console.log(err.response)
        }
        this.setState({ error: err, loading: false });
      });

  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.handleFetchOrder(this.props.token)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.handleFetchOrder(newProps.token)
      }
    }

  }

  handleAddToCart = slug => {
    this.setState({ loading: true });
    //const variations = this.handleFormatData(itemVariations);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .post(addToCartURL, { slug })
      .then(res => {
        this.props.refreshCart(this.props.token);
        this.props.refreshCart(this.props.token);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };


  handleRemoveQuantityFromCart = slug => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.post(orderItemUpdateQuantityURL, { slug })
      .then(res => {
        this.props.refreshCart(this.props.token);
        this.handleFetchOrder(this.props.token);
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleRemoveItem = itemID => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.delete(orderItemDeleteURL(itemID))
      .then(res => {
        this.handleFetchOrder(this.props.token);
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };


  render() {
    const { data, error, loading } = this.state;
    console.log(data);
    
    console.log(data);

    return (
        <>
              <Container>
        <Header>Order Summary</Header>
        {error && (
          <Message
            error
            header="There was an error"
            content={JSON.stringify(error)}
          />
        )}
        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
        {data && (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Item #</Table.HeaderCell>
                <Table.HeaderCell>Item name</Table.HeaderCell>
                <Table.HeaderCell>Item price</Table.HeaderCell>
                <Table.HeaderCell>Item quantity</Table.HeaderCell>
                <Table.HeaderCell>Total item price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.order_items.map((orderItem, i) => {
                return (
                  <Table.Row key={orderItem.id}>
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell>
                      {orderItem.item.title} -{" "}
                    </Table.Cell>
                    <Table.Cell>${orderItem.item.price}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Icon
                        name="minus"
                        style={{ float: "left", cursor: "pointer" }}
                        onClick={() =>
                          this.handleRemoveQuantityFromCart(orderItem.item.slug)
                        }
                      />
                      {orderItem.quantity}
                      <Icon
                        name="plus"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() =>
                          this.handleAddToCart(
                            orderItem.item.slug,
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {orderItem.item.discount_price && (
                        <Label color="green" ribbon>
                          ON DISCOUNT
                        </Label>
                      )}
                      ${orderItem.final_price}
                      <Icon
                        name="trash"
                        color="red"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => this.handleRemoveItem(orderItem.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              <Table.Row>
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell textAlign="right" colSpan="2">
                  Order Total: ${data.total}
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="5">
                  <Link to="/checkout">
                    <Button floated="right" color="yellow">
                      Checkout
                    </Button>
                  </Link>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        )}
      </Container>
        </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: (token) => dispatch(fetchCart(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary);
