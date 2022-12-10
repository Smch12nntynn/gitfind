import { Header } from '../../components/Header'
import { useState } from 'react'
import ItemList from '../../components/ItemList'
import './style.css'


const background = 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80'




function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login })

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }


  }



  return (
    <div className="App">
      <Header />
      <div className='content'>
        <img src={background} className="background" alt="background app" />
        <div className='info'>
          <div>
            <input
              name='user'
              placeholder='@username'
              value={user}
              onChange={event => setUser(event.target.value)}
            />
            <button onClick={handleGetData}>Search</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className='shape'>
                <img

                  alt='img porfile'
                  src={currentUser.avatar_url}
                  className='profile' />

                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>) : null}
          {repos?.length ? (
            <>
              <div>
                <h4 className='repositories'>Repositories</h4>
                {repos.map(repo => (
                  <ItemList title={repo.name} description={repo.description} />
                ))}
              </div>
            </>) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
