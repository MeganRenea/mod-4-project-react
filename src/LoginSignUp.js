import React from "react";

export default class LoginSignUp extends React.Component {
  render() {
    return (
      <>
        <div>
          {localStorage.getItem("user")
            ? this.props.history.push("/home")
            : null}
        </div>
        <form
          className="login"
          onChange={this.props.inputChange}
          onSubmit={event => this.props.handleLogin(event, this.props.history)}
        >
          <h1>Login</h1>
          <input
            value={this.props.username_login}
            name="username_login"
            placeholder="Username"
          />
          <br></br>
          <input
            value={this.props.password_login}
            name="password_login"
            type="password"
            placeholder="Password"
          />
          <br></br>
          <button type="submit"> Submit </button>
        </form>{" "}
        <br></br> <br></br>
        <form
          className="signup"
          onChange={this.props.inputChange}
          onSubmit={event =>
            this.props.login(
              event,
              this.props.username_signUp,
              this.props.history
            )
          }
        >
          <h1>Sign Up </h1>
          <input
            value={this.props.username_signUp}
            name="username_signUp"
            placeholder="Username"
          />
          <br></br>
          <input
            value={this.props.password_signUp}
            name="password_signUp"
            type="password"
            placeholder="Password"
          />
          <br></br>
          <input
            value={this.props.password_confirmation}
            name="password_confirmation"
            type="password"
            placeholder="Password Confirmation"
          />
          <br></br>
          <button type="submit"> Submit </button>
        </form>
      </>
    );
  }
}
