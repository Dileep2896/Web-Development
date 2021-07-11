import React, { Component } from 'react'
import TransactionForm from './TransactionForm'
import { Button } from 'react-bootstrap';

class Transactionlist extends Component {

    state = {
        currentIndex: -1,
        list: this.returnList()
    }

    returnList() {
        if(localStorage.getItem('transactions') == null)
            localStorage.setItem('transactions',JSON.stringify([]))
        return JSON.parse(localStorage.getItem('transactions'))
    }

    onAddorEdit = (data) => {
        var list = this.returnList()
        if (this.state.currentIndex == -1)
            list.push(data)
        else
            list[this.state.currentIndex] = data
        localStorage.setItem('transactions',JSON.stringify(list))
        this.setState({list, currentIndex:-1})
    }

    handleEdit = index => {
        this.setState({
            currentIndex: index
        })
    }

    handleDelete = index => {
        var list = this.returnList()
        list.splice(index, 1)
        localStorage.setItem('transactions',JSON.stringify(list))
        this.setState({list, currentIndex:-1})
    }

    render() {
        return (
            <div class="container mt-lg-5">
                <div class="row">
                    <div class="col-lg-6 mt-lg-0 mt-5">
                        <div class="bank__list">
                            {
                                this.state.list.map((item, index) => {
                                    return <div class="list__group">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1"><span>Account Number: </span>{item.accNo}</h5>
                                        </div>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1"><span>Beneficiary Name: </span>{item.bName}</h5>
                                        </div>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1"><span>Total Amount: </span>Rs. {item.amount}</h5>
                                        </div>
                                        <Button class="edit__button" onClick={() => this.handleEdit(index)}>Edit</Button>
                                        <Button class="delete__button" onClick={() => this.handleDelete(index)}>Delete</Button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div class="col-lg-6 mt-lg-0 mt-5">
                        <TransactionForm 
                            onAddorEdit = {this.onAddorEdit}
                            currentIndex = {this.state.currentIndex}
                            list = {this.state.list}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Transactionlist