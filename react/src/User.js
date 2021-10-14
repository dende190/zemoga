import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import useFetch from './hooks/useFetch'
import './User.css';

function User(props) {
  const [user, setUser] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [textareaHidden, setTextareaHidden] = useState(true);
  const [experience, setExperience] = useState('');
  const [stateLoader, setStateLoader] = useState(true);
  const id = props.match.params.id;

  useFetch(
    `https://qb6lizgdg9.execute-api.us-east-1.amazonaws.com/user/users/${id}`,
    setUser,
    setStateLoader
  );

  useFetch(
    `http://localhost:3008/tweets/${user.twitter_user_id}`,
    setTweets,
    setStateLoader
  );

  const handlerEditExperience = function() {
    if (textareaHidden) {
      setExperience(user.experience_summary);
    }
    setTextareaHidden(!textareaHidden);
  }

  const handlerSaveExperience = async function(event) {
    setStateLoader(true);
    let userEdit = user;
    userEdit.experience_summary = experience;
    try {
      const response = await fetch(
        `https://qb6lizgdg9.execute-api.us-east-1.amazonaws.com/user/users/${id}`,
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
      const json = await response.json();
      setStateLoader(false);
    } catch (error) {
      console.log("error", error);
      handlerEditExperience();
      return;
    }

    setUser(userEdit);
    handlerEditExperience();
  }

  const handlerCancelExperience = function() {
    setUser(user);
    handlerEditExperience();
  }

  const handlerChangeExperience = function(event) {
    setExperience(event.target.value);
  }


  return (
    <div className="content">
      {
        stateLoader && <Loader state={stateLoader} />
      }
      <h1 className="page_title">Juanpis Tweets</h1>
      <h1 className="user_title">{user.names + ' ' + user.last_names}</h1>
      <div className="user_container">
        <div className="Tweets_container">
          <img src={user.image_url} className="user_image"/>
          <h3>{user.title} Tweets</h3>
          <hr/>
          {
            Object.keys(tweets).length > 0 ?
            (
              <ul>
                {
                  tweets.map(tweet => (
                    <li className="tweets_list" key={tweet.id}>
                      <div className="tweet_container">
                        <div className="tweet_user">
                          <img src={tweet.user.profile_image_url_https} />
                          <h3>{tweet.user.name}</h3>
                        </div>
                        <div className="tweet">
                          <p>{tweet.text}</p>
                          <small>{tweet.created_at}</small>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            ) :
            <p>Sin usuarios</p>
          }
        </div>
        <div className="information_container">
          <h3>My Work experience</h3>
          <button onClick={handlerEditExperience} hidden={!textareaHidden}>
            Editar
          </button>
          <button onClick={handlerSaveExperience} hidden={textareaHidden}>
            Guardar
          </button>
          <button onClick={handlerCancelExperience} hidden={textareaHidden}>
            Cancelar
          </button>
          <hr/>
          <p className="work_experience" hidden={!textareaHidden}>
            {user.experience_summary}
          </p>
          <textarea
            hidden={textareaHidden}
            value={experience}
            onChange={handlerChangeExperience}
          />
        </div>
      </div>
      <Link to="/">Go to User List</Link>
    </div>
  );
}

export default User;
