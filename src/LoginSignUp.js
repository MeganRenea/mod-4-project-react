import React from "react"

export default class LoginSignUp extends React.Component {

    render(){
        return (
            <>
            <h1>Login</h1>
            <form onChange={this.props.inputChange} onSubmit={(event)=>this.props.login(event,this.props.username_login)}>
                <input  value={this.props.username_login} name="username_login" placeholder="Username"/><br></br>
                <input  value={this.props.password_login} name="password_login" type="password" placeholder="Password" /><br></br>
                <button type="submit"> Submit </button>
            </form> <br></br> <br></br>
            <h1>Sign Up </h1>
            <form onChange={this.props.inputChange} onSubmit={(event)=>this.props.login(event, this.props.username_signUp)}>
                <input  value={this.props.username_signUp} name="username_signUp" placeholder="Username"/><br></br>
                <input  value={this.props.password_signUp} name="password_signUp" type="password" placeholder="Password" /><br></br>
                <input  value={this.props.password_confirmation} name="password_confirmation" type="password" placeholder="Password Confirmation" /><br></br>
                <button type="submit"> Submit </button>
            </form>
            </>
            
        )
    }

}