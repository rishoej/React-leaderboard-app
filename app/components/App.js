import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FetchData from '../actions/fetchData';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      recent:[],
      alltime:[]
    }
    this.sortUsers = this.sortUsers.bind(this);
  }
  sortUsers(sort) {
    this.setState({
      users: sort
    });
  }
  componentDidMount() {
    FetchData('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(recent => {
      FetchData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(alltime => {
        this.setState({
          users: recent,
          recent: recent,
          alltime: alltime
        });
      });
    });
  }
  render() {
    const { users } = this.state;
    let rank = 0;
    var profile = this.state.users.map((user) => {
      rank++;
      return (
        <tr key={rank}>
          <td><p>{rank}</p></td>
          <td><img src={user.img} />
            <p>{user.username}</p>
          </td>
          <td><p>{user.recent}</p></td>
          <td><p>{user.alltime}</p></td>
        </tr>
      );
    })
    return (
      <div className="main-app-container">
        <div className="main-app-nav">React Leaderboard App</div>
        <hr/>
        <div>
          <table>
            <thead>
              <tr>
                <td><p>#</p></td>
                <td><p>Users</p></td>
                <td>
                  <a href='#' onClick={() => this.sortUsers(this.state.recent)}>
                    <p>Points in past 30 days⇩</p>
                  </a>
                </td>
                <td>
                  <a href='#' onClick={() => this.sortUsers(this.state.alltime)}>
                    <p>All time points⇩</p>
                  </a>
                </td>
              </tr>
            </thead>
            <tbody>
              {profile}
            </tbody>
          </table>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
