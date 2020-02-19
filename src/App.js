import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    users: [], 
    user: {
      email_id: ''
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch('http://localhost:4000/getList')
    .then(response => response.json())
    .then(response => this.setState({users: response.data}))
    .catch(err => console.log(err))
  }

  addUsers = () => {
    const { user } = this.state;
    fetch(`http://localhost:4000/addNew?email_id=${user.email_id}`)
    .then(this.getUsers)
    .catch(err => console.log(err))
  }

  renderUsers = ({sl_user, email_id}) => {
    return <div key={sl_user}>{email_id}</div>
  }

  render() {
    const { users, user } = this.state;
    return (
      <div className="App">
        {users.map(this.renderUsers)}
        <div>
          <input value={user.email_id}
          onChange={e => this.setState({ user: { ...user, email_id: e.target.value } })} />
          <button type="button" onClick={this.addUsers}>Add Data</button>
        </div>
      </div>
    );
  }
}

export default App;
