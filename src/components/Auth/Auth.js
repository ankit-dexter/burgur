import React , {Component} from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './Auth.css';
import {connect } from 'react-redux';
import * as actionType from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
    state ={
        controls : {
            email: {
                elementType: 'inpot',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail : true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength : 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp : true
    }

    componentDidMount () {
        if(this.props.building){
            this.props.onSetAuthRedirectPath('/checkout');
        }
        else this.props.onSetAuthRedirectPath('/');
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        //console.log('validating');
        const updatedControl = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched : true
    
            }
        }
        //console.log(updatedControl[controlName].touched);
        this.setState({controls : updatedControl});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.authanticate(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
        //this.props.history.push('/');
    }

    switchHandler = () => {
        //console.log(this.state.isSignUp);
        this.setState ({isSignUp : !this.state.isSignUp});
    }

    render () {
        let formElement = [];
        for (let key in this.state.controls) {
            formElement.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        
        let action = null;
        let switchAction = null;
        if(this.state.isSignUp){ //console.log('[ SIGN UP ]');
            action = <p>SIGN UP</p>
            switchAction = <p>Switch To SIGN IN</p>
        }
        else { //console.log('[ SIGN IN ]');
            action = <p>SIGN IN</p>
            switchAction = <p>Switch To SIGN UP</p>
        }

        
        // console.log(this.props.loading);
        // console.log(this.props.errorMsg);
        let errorMsg = null;
        if(this.props.error){
        errorMsg = <p>{this.props.error.message}</p>;
        }
        let form = <Spinner></Spinner>
        if(!this.props.loading){
            form = formElement.map(control => (
                <Input  
                key={control.id}
                elementType={control.config.elementType} 
                elementConfig={control.config.elementConfig} 
                value={control.config.value} 
                invalid={!control.config.valid}
                shouldValidate={control.config.validation}
                touched={control.config.touched}
                changed={(event) => this.inputChangedHandler(event,control.id)}/>
            )    
            );
            //console.log(form);
        }
        
        let isAuthRedirect = null;
        if(this.props.isAuth){
            isAuthRedirect=<Redirect to={this.props.path} />
        }

        return (
           <div className={classes.Auth}>
               {isAuthRedirect}
               <h2>{errorMsg}</h2>
               <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType='Success'>{action}</Button>
               </form>
               <Button btnType='Danger' clicked={this.switchHandler}>{switchAction}</Button>
           </div>
        );
    }
}

const mapStateToProps = state => {
    return    {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuth : state.auth.token !== null,
        building : state.burgerBuilder.building,
        path : state.auth.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authanticate : (email,password,isSignUp) => dispatch(actionType.auth(email,password,isSignUp)),
        onSetAuthRedirectPath : (path) => dispatch(actionType.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);