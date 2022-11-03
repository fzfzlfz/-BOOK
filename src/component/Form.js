import React, { Component } from "react";
import * as TableAPI from '../utils/TableAPI';

class Form extends Component{
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            date: "",
            amount: "",
            category: "",
            comment: ""
        }
    }
    isValid() {
        const {date, amount, category, comment} = {...this.state};
        return date && amount && category && comment;
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = {
            date : this.state.date,
            amount : Number.parseInt(this.state.amount, 0),
            category : this.state.category,
            comment : this.state.comment,
            id: this.props.id
        }
        TableAPI.create(data).then(
            res => {
                this.props.addline(data)
                this.setState({
                    date: "",
                    amount: "",
                    category: "",
                    comment: ""
                })
            }
        ).catch(
            err => console.log(err.message)
        );
    }

    handleChange(e) {
        const name = e.target.name;
        let obj;
        this.setState((
            obj = {},
            obj["" + name] = e.target.value,
            obj
        ))
    }

    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="date" name="date" value={this.state.date}></input>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="amount" name="amount" value={this.state.amount}></input>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="category" name="category" value={this.state.category}></input>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="comment" name="comment" value={this.state.comment}></input>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.isValid()}>Add</button>
            </form>
        );
    }
}

export default Form;