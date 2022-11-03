import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as TableAPI from '../utils/TableAPI';

class TableCreate extends Component{
    constructor() {
        super();
        this.state = {
            edit: false
        };
    }
    switchEdit() {
        this.setState({
            edit: !this.state.edit
        });
    }
    
    handleUpdate(e) {
        e.preventDefault();
        const data = {
            // 'id': Number.parseInt(this.props.table.id),
            'date': this.refs.date.value,
            'amount': Number.parseInt(this.refs.amount.value),
            'category': this.refs.category.value,
            'comment': this.refs.comment.value
        }
        TableAPI.update(this.props.table.id, data).then(
            res => {
                this.setState({
                    edit: false
                })
                this.props.handleUpdate(this.props.table, res.data)
            }
        ).catch(
            err => console.log(err.message)
        );
    }
    handleEdit() {
        return (
        <tr>
            <td><input type="text" className="form-control" defaultValue={this.props.table.date} ref="date"></input></td>
            <td><input type="text" className="form-control" defaultValue={this.props.table.amount} ref="amount"></input></td>
            <td><input type="text" className="form-control" defaultValue={this.props.table.category} ref="category"></input></td>
            <td><input type="text" className="form-control" defaultValue={this.props.table.comment} ref="comment"></input></td>
            <td>
                <button className='btn btn-info mr-1' onClick={this.handleUpdate.bind(this)}>Update</button>
                <button className='btn btn-danger' onClick={this.switchEdit.bind(this)}>Cancel</button>
            </td>
        </tr>
        )
    }

    handleDelete(e) {
        e.preventDefault();
        TableAPI.remove(this.props.table.id).then(
            res => this.props.handleDelete(this.props.table)
        ).catch(
            err => console.log(err.message)
        );
    }
    handleView() {
        return (
        <tr>
            <td>{this.props.table.date}</td>
            <td>{this.props.table.amount}</td>
            <td>{this.props.table.category}</td>
            <td>{this.props.table.comment}</td>
            <td>
                <button className='btn btn-info mr-1' onClick={this.switchEdit.bind(this)}>Edit</button>
                <button className='btn btn-danger' onClick={this.handleDelete.bind(this)}>Delete</button>
            </td>
        </tr>
        )
    }

    render() {
        if(this.state.edit) {
            return this.handleEdit();
        } else {
            return this.handleView();
        }
    }
}

TableCreate.propTypes = {
    table: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      amount: PropTypes.number,
      category: PropTypes.string,
      comment: PropTypes.string
    })
  }
export default TableCreate;