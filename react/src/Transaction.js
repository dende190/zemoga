import React, {useState, useEffect} from 'react';
import Menu from './Menu';
import Table from './Table';
import Loader from './Loader';
import './Account.css';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [stateLoader, setstateLoader] = useState(true);
  const tableTitles = [
    'Nombre Cuenta',
    'Fecha',
    'Tipo',
    'Descripcion',
    'Gasto',
    'Estado',
  ];

  useEffect(() => (
    fetch(
      'https://ammper-api.herokuapp.com/api/belvo/user/transactions',
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({'token': localStorage.token}),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        window.location.href = '/';
        return;
      }
      setTransactions(data);
      setstateLoader(false);
    })
    .catch(error => console.log(error))
  ));

  return (
    <div className="content">
      <Menu />
      {
        stateLoader && <Loader state={stateLoader} />
      }
      <h1>Bienvenido a Juanpis Banks</h1>
      <h3>Aqui podras ver tus cuentas y entrar a ellas para ver sus datos</h3>
      <p>
        Recuerda que soy una gran opcion y me vas a tener en cuenta
        para contratarme 🥺
      </p>
      <Table titles={tableTitles} contents={transactions} />
    </div>
  );
}

export default Transaction;
