import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = ( orderData,token ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post( '/orders.json', orderData )
            .then( response => {
               // console.log( response.data );
                dispatch( purchaseBurgerSuccess( response.data.name, orderData ) );
            } )
            .catch( error => {
                dispatch( purchaseBurgerFail( error ) );
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        //console.log(token);
        axios.get( '/orders.json' )
            .then( res => {
               // console.log(token);
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        taskId: key
                    } );
                }
               // console.log("{inside order.js action}")
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};

export const deleteOrderSuccess = (id) => {
    return {
        type : actionTypes.DELETE_ORDER_SUCCESS,
        orderId : id
    }
}

export const deleteOrder = (id,token) => {
    return dispatch => {
        axios.delete( '/orders/'+id+'.json' )
            .then( res => {
               // console.log(res);
                dispatch(deleteOrderSuccess(id));
            } )
            .catch( err => {
                dispatch(deleteOrderFailed(err));
            } );
    }

}

export const deleteOrderFailed = (error) => {//console.log('errrroooooorrrss')
    return {
        type : actionTypes.DELETE_ORDER_FAILED,
        error : error
    }
}