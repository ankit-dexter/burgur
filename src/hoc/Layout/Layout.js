import React, { Component } from 'react';

import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
//import * as actionTyoe from '../../store/actions/index';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        //console.log('[ MODAL ]'+this.props.isLogedIn)
        return (
            <Aux>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler} 
                    isLogedIn = {this.props.isLogedIn} 
                     />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isLogedIn = {this.props.isLogedIn}  />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        isLogedIn : state.auth.token !==null
    }
}



export default connect(mapStateToProps)(Layout);