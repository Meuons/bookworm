import React, { Component } from 'react'
import ReactDOM from 'react-dom'
let deployed = true
let url = ''
if (deployed) {
  url = 'https://bookworm-service.herokuapp.com/'
}
else {
  url = 'http://localhost:3000/'
}


class Start extends Component {
  constructor(props) {
    super(props);

    this.state = { array: [], title: '', author: '', price: 0, image: '', id: '', description: '', amount: 1, totalAmount: 0, totalPrice: 0, totalTax: 0 }

  }


  componentDidMount() {
    //Get all the items
    let total = JSON.parse(localStorage.getItem("total"))
    if (total == null) {
      this.setState({ totalAmount: 0, totalPrice: 0, totalTax: 0 })
    }
    else {
      this.setState({ totalAmount: total.amount, totalPrice: total.price, totalTax: total.tax })
    }

    fetch(url)
      .then(async response => {
        const data = await response.json();


        if (!response.ok) {

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        //Store all the items from the database in an array
        data.reverse();
        this.setState({ array: data })


      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });



  }
  reset() {
    window.location.reload(false);
  }
  singleProduct(id) {
    fetch(url + 'products/' + id)
      .then(async response => {
        const data = await response.json();


        if (!response.ok) {

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.setState({ title: data.title, author: data.author, price: data.price, image: data.image, id: data._id, description: data.description })
        //Store all the items from the database in an array

        ReactDOM.render(
          <div id={this.state.id + "single"} className="single">

            <img alt="Full image" src={this.state.image}></img>
            <div>
              <h1 className="thumbnailText">{this.state.title}  - {this.state.author}</h1>
              <p className="productDescription">{this.state.description}</p>
              <div>

                <button className="cartBtn" onClick={() => { this.addToCart(this.state.id) }} ><img alt="cart" className="cartIcon" src={require('./img/cart.png')}>
                </img>{this.state.price} kr</button>
              </div>

              <button onClick={() => { this.reset() }} ><img alt="arrow" className='icon' src={require('./img/arrow.png')}></img>Go back</button>
            </div>
          </div>, document.getElementById('wrapper'))


      });
  }

  addToCart(id) {
    fetch(url + 'products/' + id)
      .then(async response => {
        const data = await response.json();


        if (!response.ok) {

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ title: data.title, price: data.price, image: data.image, id: data._id })
        //Store all the items from the database in an array

        if (localStorage.getItem(this.state.id) != null) {
          this.state.amount = JSON.parse(localStorage.getItem(this.state.id)).amount + 1

        }
        else {
          this.state.amount = 1
        }
        let tax = this.state.price * 0.8 / 4
        this.setState({ totalAmount: this.state.totalAmount + 1, totalPrice: this.state.totalPrice + this.state.price, totalTax: this.state.totalTax + tax })
        localStorage.setItem("total", JSON.stringify({ price: this.state.totalPrice, amount: this.state.totalAmount, tax: this.state.totalTax }))
        let obj = { title: this.state.title, price: this.state.price * this.state.amount, image: this.state.image, id: this.state.id, amount: this.state.amount };

        localStorage.setItem(this.state.id, JSON.stringify(obj))
        window.location.reload(false);
      })

      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });


  }





  render() {
    const { array } = this.state
    return (
      <>

        <div id="products">
          <h1>Products</h1>
          {array.map(item =>
            //Loop all the items and write out their properties
            <React.Fragment key={item._id}>
              <div id={item._id + "Thumbnail"} className="thumbnail">
                <div>
                  <img alt="thumbnail" onClick={() => { this.singleProduct(item._id) }} className="thumbnailImage" src={item.image}></img>
                </div>
                <div>
                  <div>
                    <h2 className="thumbnailText">{item.title}</h2>
                    <span>
                      {item.author}
                    </span>
                  </div>
                  <div>

                    <button className="cartBtn" onClick={() => { this.addToCart(item._id) }} ><img alt="cart" className="cartIcon" src={require('./img/cart.png')}>
                    </img>{item.price} kr</button>
                  </div>
                </div>
              </div>

            </React.Fragment>

          )}
        </div>
      </>
    )
  }
}

export default Start

