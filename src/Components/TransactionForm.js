import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

class TransactionForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
        if (this.props.currentIndex == -1)
            return {
                accNo: "",
                ifscCode: "",
                bName: "",
                amount: ""
            }
        else
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex != this.props.currentIndex || prevProps.list.length != this.props.list.length)
            this.setState({...this.returnStateObject() })
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onAddorEdit(this.state)
    }

    render() {
        return (
            <div class="form__main text-center">
                <form onSubmit={this.handleSubmit} autoComplete = "off">
                    <input name="accNo" placeholder="Account Number" value = {this.state.accNo} 
                        onChange = {this.handleInputChange} /> <br />
                    <input name="ifscCode" placeholder="IFSC Code" value = {this.state.ifscCode} 
                        onChange = {this.handleInputChange} /> <br />
                    <input name="bName" placeholder="Beneficiary Name" value = {this.state.bName} 
                        onChange = {this.handleInputChange} /> <br />
                    <input name="amount" placeholder="Amount" value = {this.state.amount} 
                        onChange = {this.handleInputChange} /> <br />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

export default TransactionForm
