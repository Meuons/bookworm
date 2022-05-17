import React from 'react'

import Index from './index'
import './App.scss'
import Start from './Start'
import Cart from './Cart'
import Confirmation from './Confimartion'
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('order_id')



//Functional component
const App = () => {
  let confirmation = false;
if (orderId != null) {
  confirmation = true
}

function Component(props) {
  const isConfirmed = props.isConfirmed;
  if (isConfirmed) {
    return <Confirmation />;
  }
  return <Start />;
}

  //render single App component
  return(
    <>
<header>
 
    <nav>
   <div className="logo">
   <button onClick ={() => { window.location.reload(false); }} className="logo">Bookworm</button>
    </div>
    
<Cart/>
    </nav>
</header>
<div id="wrapper">
  
<Component isConfirmed={confirmation}/>
</div>

    </>
  )
}
  
export default App