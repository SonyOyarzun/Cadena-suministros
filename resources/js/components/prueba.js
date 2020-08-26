import React, { Component } from 'react';
import { MDBDataTable, MDBInput } from 'mdbreact';

class App extends Component {
    
  state = {
    checked: ['checkbox1', 'checkbox2', 'checkbox3']
  };

  toggleCheck = e => {
    let checkedArr = this.state.checked;
    checkedArr.filter(name => name === e.target.id)[0] 
      ? checkedArr = checkedArr.filter(name => name !== e.target.id)
      : checkedArr.push(e.target.id);
    this.setState({checked: checkedArr})
  };

  isChecked = id => this.state.checked.filter(name => name === id)[0] ? true : false


  render() {
      
    useEffect(() => {

        axios.get('json-api/my')
          .then(response => {
            setProducts(response.data);
            //   console.log(response.data)
          }).catch(error => {
            alert("Error " + error)
          })
    
        createJson
    
      }, []);
    
      const createJson = (
    
        columns.push({
          check: 'check',
          label: '',
          field: 'check',
        }),
    
        Object.keys(products).map((key, row) => (
    
          preRows = [],
          preRows['check'] = <input label=" " type="checkbox" id={'checkbox'+row} />,
    
          Object.keys(products[key]).map((key2, col) => (
            {
              ...count < Object.keys(products[key]).length &&
              columns.push({
                label: key2,
                field: key2,
              }),
            },
            //  console.log('contador :',count,' limite',Object.keys(this.state.products[key]).length,' col:',columns),
            preRows[key2] = products[row][key2],
            count = count + 1
          )),
          rows.push(preRows)
    
        )),
    
        
    
        data = {
          columns,
          rows
        }
    
      );

    return <MDBDataTable striped bordered hover data={data} />;
  }
}

export default App;