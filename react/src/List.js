import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import useFetch from './hooks/useFetch'

function List() {
  const [users, setUsers] = useState([]);
  const [stateLoader, setStateLoader] = useState(true);

  useFetch(
    'https://qb6lizgdg9.execute-api.us-east-1.amazonaws.com/user/users',
    setUsers,
    setStateLoader
  );

  return (
    <div className="content">
      {
        stateLoader && <Loader state={stateLoader} />
      }
      <h1>Bienvenido a Juanpis Tweets</h1>
      <h3>
        Aqui puedes ver un listado de los usuarios obtenidos de la base de datos
        de Zemoga, den click al que quierna acceder:
      </h3>
      {
        Object.keys(users).length > 0 ?
        (
          <ul>
            {
              users.map(user => (
                <li key={user.id}>
                  <Link to={'/user/' + user.id}>
                    {user.names + ' ' + user.last_names}
                  </Link>
                </li>
              ))
            }
          </ul>
        ) :
        <p>Sin usuarios</p>
      }
    </div>
  );
}

export default List;
