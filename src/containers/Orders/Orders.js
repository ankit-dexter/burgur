import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentWillMount () {
        this.props.onFetchOrders(this.props.token);
    }

    render () {
        //this.props.onFetchOrders();
        let orders = <Spinner />;
        if ( !this.props.loading ) {
           // console.log(this.props.orders);
            orders = this.props.orders.map( order => {
               // console.log(order.id);
                if(order.userId===this.props.userId){
                    return (<Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        deleteOrder = {() => this.props.deleteOrder(order.id,this.props.token)} />
                )
                }
                else return null;
                
            }
                 )
        }
        
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch( actions.fetchOrders(token) ),
        deleteOrder: (id,token) => dispatch( actions.deleteOrder(id,token) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );