import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
/* Main Component */
class Main extends Component {
 
  constructor() {
   
    super();
    //Initialize the state in the constructor
    this.state = {
        products: [],
    }
  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /* fetch API in action */
    fetch('http://datos.gob.cl/api/action/datastore_search?resource_id=a60f93af-6a8a-45b6-85ff-267f5dd37ad6&limit=5')
        .then(response => {
            return response.json();
        })
        .then(products => {
            //Fetched product is stored in the state
            this.setState({ products });
        });
  }
 
 renderProducts() {
    return this.state.products.map(product => {
        return (
            /* When using list you need to specify a key
             * attribute that is unique for each list item
            */
            <li key={product.id} >
                { product.title } 
            </li>      
        );
    })
  }
   
  render() {
   /* Some css code has been removed for brevity */
    return (
        <div>
              <ul>
                { this.renderProducts() }
              </ul> 
            </div> 
       
    );
  }
}