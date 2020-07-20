import React ,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actiontype from '../../store/actions/index';

class Logout extends Component {

    componentDidMount () {
        this.props.logOut();
    }

    render () {
        return <Redirect to='/' />
    }
}


const mapDispatcherToProps = dispatch => {
    return {
        logOut : () => dispatch(actiontype.logOut())
    }    
}


export default connect(null,mapDispatcherToProps)(Logout);