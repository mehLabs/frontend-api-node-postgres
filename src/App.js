import { useEffect, useState } from 'react';
import './App.css';
import { Button, Container} from 'reactstrap';
import MyModal from './MyModal';


function Tabla(props) {
  

  return (<table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Contraseña</th>
              </tr>
            </thead>
            <tbody>
              {
                props.usuarios?.map( (usuario,index) => {
                  return <Fila key={index.toString()} name={usuario.name} email={usuario.email} id={index} />
                })
              }
            </tbody>
          </table>
        )
}

function Fila(props){
  return(
    <tr>
      <th scope="row">{props.id + 1}</th>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>*******</td>
      <td className='d-flex' >
        <Button color="primary" className='ms-auto me-1'>Editar</Button>
        <Button color="danger">Eliminar</Button>
      </td>
    </tr>
  )
}

function App() {
  const url = "http://localhost:7000/usuarios";
  const [usuarios,setUsuarios] = useState();
  const fetchApi = async () => {
    const response = await fetch(url);
    console.log(response.status);
    const responseJson = await response.json();
    setUsuarios(responseJson);
    console.log(responseJson);
  }
  useEffect(() => {
    fetchApi()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          CRUD hecho con express.js y PostgreSQL
        </h1>
      </header>
      <Container>
        <div>
          <MyModal />
          { !usuarios ? 'Cargando...' : 
              <Tabla usuarios={usuarios} />
          }
        </div>
      </Container>
    </div>
  );
}


export default App;
