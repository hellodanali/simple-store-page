const INITIAL_STATE = {
  cart: [],
  total: 0,
  itemCount: 0
};

export default function fetchData ( state = INITIAL_STATE, action) {
  switch(action.type){
    case 'FETCH_DATA':
    return Object.assign({}, state, { infos: action.payload.data });

    case 'UPDATE_CART':
    checkCart(state, action);
    return Object.assign({}, state);

    case 'DELETE_ITEM':
    deleteItem(state, action);
    return Object.assign({}, state);

    default: 
      return state;
  }
}

/*** HELPER FUNCTION ***/

/* DELETE ITEM */
function deleteItem(state, action){
  state.cart.forEach(function(each, index) {
    if(action.item.name === each.name){
      state.cart.splice(index, 1);
      state.total -= (each.price.toFixed(2) * each.count);
      state.itemCount -= each.count;
    }
  });
}
/* UPDATE STATE CART */
function checkCart(state, action) {
  let update = true;
  const newItem = {};
  // console.log('* reducer *', action.item)
  newItem.name = action.item.name;
  newItem.count = 1;
  newItem.price = action.item.msrpInCents / 100;

  if(!state.cart.length){
    state.cart.push(newItem);
  } else {  
    for(var i = 0; i < state.cart.length; i++){
      if(state.cart[i].name === newItem.name){
        state.cart[i].count++;
        update = false;
      }
    }
    if(update){ 
      state.cart.push(newItem) 
    }
  }
  state.total += newItem.price;
  state.itemCount++;
}
