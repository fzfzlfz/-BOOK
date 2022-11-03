import React, { Component } from "react";
import TableCreate from './TableCreate';
import Form from './Form';
import PropTypes from 'prop-types';
import * as TableAPI from '../utils/TableAPI';
import AmountBox from './Box';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      tables: [],
      // id: 0
    }
  }
  componentDidMount() {
    TableAPI.getAll().then(
      res => this.setState({
        tables: res.data,
        isLoaded: true
      })
    ).catch(
      err => this.setState({
        err, // why can't use error: err
        isLoaded: true
      })
    );
  }

  addLine = (newline) => {
    this.setState({
      error: null,
      isLoaded: true,
      tables: [
        ...this.state.tables,
        newline
      ]
      // id: this.state.id + 1
    })
    console.log('tables = ', this.state.tables);
  }

  update(oldLine, newLine) {
    //redux code : https://redux.js.org/usage/structuring-reducers/immutable-update-patterns#updating-an-item-in-an-array
    const lineIndex = this.state.tables.indexOf(oldLine);
    const newtable = this.state.tables.map((item, index) => {
      if (index !== lineIndex) {
          return item
      }
      return {
        ...item,
        ...newLine
      }
    })
    this.setState({
      tables: newtable
    });

  }

  delete(oldLine) {
    const lineIndex = this.state.tables.indexOf(oldLine);
    const newtables = this.state.tables.filter((item, index) => index !== lineIndex);
    this.setState({
      tables: newtables
    })
  }
  
  income() {
    return this.state.tables.filter((line) => line.amount >= 0)
      .reduce((prev, curr) => {return prev += Number.parseInt(curr.amount)},0);
  }

  spending() { 
    return this.state.tables.filter((line) => line.amount < 0)
      .reduce((prev, curr) => {return prev += Number.parseInt(curr.amount)},0);
  }

  balance() {
    return this.income() + this.spending();
  }
  render() {
    const {err, isLoaded, tables} = {...this.state}
    let formret = "";
    if(!isLoaded) {
      formret = (
        <div>Loading...</div>
      )
    } else if (err) {
      formret = (
        <div>{err.message}</div>
      )
    } else {
      formret = (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <TableCreate 
                  key={table.id} 
                  table={table} 
                  handleUpdate={this.update.bind(this)}
                  handleDelete={this.delete.bind(this)}
                />)
                )}
            </tbody>
          </table>
      );
    }

    return (
      <div>
        <h2>Table</h2>
        <div className="row mb-3">
          <AmountBox text="Income" type="success" amount={this.income()}/>
          <AmountBox text="Spending" type="danger" amount={this.spending()}/>
          <AmountBox text="Balance" type="info" amount={this.balance()}/>
        </div>
        {/* <Form addline={this.addLine} id={Number.parseInt(this.state.id)}/> */}
        <Form addline={this.addLine}/>
        {formret}
      </div>
    ) 
   
  }
}


Table.propTypes = {
  isLoaded: PropTypes.bool,
  tables: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
    category: PropTypes.string,
    comment: PropTypes.string
  })
}
export default Table;
