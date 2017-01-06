import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchData, deleteItem } from '../actions/index';

class MiniStore extends Component {
  constructor(props){
    super(props);

    this.state = {
      cart: this.props.cart,
      wholesale: false
    }

    this.toggleSaleMode = this.toggleSaleMode.bind(this);
  }

  deleteItem(item){
    this.props.deleteItem(item);
    this.setState({cart: this.props.cart});
  }

  toggleSaleMode(){
    this.setState({ wholesale: !this.state.wholesale});
  }

  mapCart(cart){
    return cart.map((product, index) => {
      const itemTotalPrice = ( product.price  * product.count ).toFixed(2);
      const context = this; 

      return (
        <tbody key={index}>
          <tr>
            <td>{ product.name } </td>
            <td>{ product.count }</td>
            <td>${ itemTotalPrice }</td>
            <td>
              <button 
                onClick={ () => {
                  context.deleteItem(product);
                }} 
                className="delete">
                delete this item
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
  }

  render(){
    const cartList = this.mapCart(this.state.cart);
    return (
      <div>
        
        <Link className="mini-store back-to-main" to="/">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          Main Page
        </Link>
        <h2>
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          mini store
        </h2>

        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Count</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          { cartList }
          <tfoot>
            <tr>
              <td>Total </td>
              <td>{ this.props.itemCount }</td>
              <td>{ '$' + (this.props.total).toFixed(2) }</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <div>
          <input type="checkbox" id="cbox" onChange={this.toggleSaleMode}/>
          <label>Click to see wholesale price ( 25% off )</label>
          <h3>
            { this.state.wholesale ? 'Total $'+(this.props.total * 0.75).toFixed(2): '' }
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('mini store:', state.data.cart);
  return {
    cart: state.data.cart,
    total: state.data.total,
    itemCount: state.data.itemCount
  }
}

export default connect(mapStateToProps, { deleteItem })(MiniStore);
