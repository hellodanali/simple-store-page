import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'; 
import { fetchData, updateCart } from '../actions/index';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { set: false, all: []};

    this.filter = this.filter.bind(this);
    this.restore = this.restore.bind(this);
    this.byName = this.byName.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  
  componentWillMount(){
    let test = this.props.fetchData();
    test.then((res) => {
      this.setState({ all: res.payload.data.products})
    }); 
  }

  addItem(item){
    this.props.updateCart(item);
  }

  mapProducts(array){
    return array.map((product, index) => {
      const price = product.msrpInCents / 100;
      const context = this; 

      return (
        <div className="each-product" key={index}>
          <h3>{ product.name } - ${ price }</h3>
          <img src={ product.mainImage.ref} />
          <div><button onClick={
            function(){
              context.addItem(product);
            }} 
            className="add-to-cart">Add to Cart</button></div>
        </div>
      );
    })
  }

  filter(){
    let filtered = [];
    this.props.data.infos.products.forEach((each) => {
      if(each.msrpInCents/100 >= 20){
        filtered.push(each);
      }
    })
    this.setState({ all: filtered });
  }

  restore () {
    this.setState({all: this.props.data.infos.products});
  }

  byName () {
    const products = this.props.data.infos.products.slice();
    products.sort((a,b) => {
      if(a.name > b.name){
        return 1;
      }
      if(a.name < b.name){
        return -1;
      }
      return 0;
    });
    this.setState({ all: products});
  }

  render() {
    if(this.props.data.infos){
      // console.log('***', this.props.data.infos);
      let list = this.mapProducts(this.state.all);
      return (
        <div>
          <div className='nav'>
            <button onClick={ this.restore }>all products</button>
            <button onClick={ this.filter }>products over $20</button>
            <button onClick={ this.byName }>sort by name</button>
          </div>
          <Link className="mini-store" to="/ministore">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            mini store 
            { ' ( '+ this.props.data.itemCount + ' )' }
          </Link>
          <h2 className='page-title'>{ this.props.data.infos.pageTitle }</h2>
          <div className='all-products'>{ list }</div>
        </div>
      );
    } else {
      return (
        <div>Products Loading</div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  console.log('App:', state.data);
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps, { fetchData, updateCart })(App);
