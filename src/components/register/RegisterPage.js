import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import RegisterForm from './RegisterForm'
import axios from 'axios'
import Cookies from 'universal-cookie';

class RegisterPage extends Component {
    
    state = {
        showRegisterForm: false
    }

    toggleRegisterForm = () => {
        this.setState({
            showRegisterForm: true
        })
    }

    registerUser = (user) => {
        axios.post("http://localhost:9001/auth/register", { 
                emailAddr: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                password: user.password
            })
            .then(res => {
                if (res.data.valid) {
                    const cookies = new Cookies();
                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    
                    // set cookies
                    cookies.set('auth_id', res.data.userId, { path: '/', expires: tomorrow });
                    cookies.set('auth_token', res.data.authToken, { path: '/', expires: tomorrow });

                    // redirect
                    this.props.history.push("/expenses")
                } else {
                    // error message
                    console.log(res)
                }
            })
    }

    render() {
        return (
            <div className="login-page">
                <PageTitle title="Register" />
                <RegisterForm registerUser={this.registerUser}/>
            </div>
        )
    }

}

export default RegisterPage