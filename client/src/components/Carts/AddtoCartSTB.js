import React, { Component } from "react";
import axios from "axios";
import '../css'
import menuItems from './CartUtils/starbucks.json'
import InputComponent1 from './InputComponent1'
import Cart from './Cart'

export default class AddtoCartSTB extends Component {
    state = {
        value: 0,
        products: []

    }

    updateCart = () => {
        axios.get("/pbyapi/api/").then((response) => {

            this.setState({
                products: response.data
            })
            console.log(this.state.products)
        });
    }
    deleteItem = (id) => {
        axios.delete(`/pbyapi/api/${id}`).then(response => {
            this.setState({
                products: this.state.products.filter(product => product._id !== id)
            });
        });
    }
    addProductHandler = (name, price, quantity, image) => {
        // console.log(event)
        const data = {
            name: name,
            quantity: quantity,
            price: price,
            image: image
        };
        console.log(data)

        axios.post("/pbyapi/api/", data).then(data => this.updateCart());

    }
    render() {
        return (
            <body className="page-body">
            <section className="page-wrapper innerpage-section-padding">
            <div id="menu-page" className="menu-list">
            <div className="container-fluid text-center menu">
                <div id="lunch-dishes" className="tab-pane fade active in">
                    {menuItems.map(menuItem => {
                        return (
                            <InputComponent1 menuItem={menuItem}
                                addToCart={this.addProductHandler} />
                        )
                    })}
                </div>
                <Cart update={this.updateCart}
                    products={this.state.products}
                    delete={this.deleteItem} />
            </div >
            </div>
            </section>
            </body>
        );
    }
}
