import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {isError: false, username: '', password: '', showPassword: false}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onCheckboxChange = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  onSubmitForm = async event => {
    event.preventDefault()
    console.log('ok')
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({isError: true, username: '', password: ''})
    }
  }

  onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showPassword, isError} = this.state
    const passwordType = showPassword ? 'text' : 'password'
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmitForm} type="submit">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt=""
            />
            <div>
              <label htmlFor="username">USERNAME</label>
              <input
                onChange={this.onUsernameChange}
                value={username}
                placeholder="Username"
                id="username"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="password">PASSWORD</label>
              <input
                onChange={this.onPasswordChange}
                value={password}
                placeholder="Password"
                id="password"
                type={`${passwordType}`}
              />
            </div>
            <div>
              <input
                onChange={this.onCheckboxChange}
                id="checkbox"
                type="checkbox"
              />
              <label value={showPassword} htmlFor="checkbox">
                Show Password
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
          {!isError ? null : <p>{`Username and Password didn't match`}</p>}
        </div>
      </div>
    )
  }
}
export default Login
