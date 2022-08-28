import { useEffect, useState } from 'react';
import './App.css';
import { Button, Container} from 'reactstrap';
import MyModal from './MyModal';
import MyModalEdit from './MyModalEdit';


function Tabla(props) {

  const handleDelete = (rowId) => {
    props.handleDelete(rowId);
  }
  

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
                  return <Fila handleDelete={handleDelete} key={index.toString()} name={usuario.name} email={usuario.email} userId={usuario.id} id={index} />
                })
              }
            </tbody>
          </table>
        )
}

function Fila(props){
  const url = "http://localhost:7000/usuarios";
  const [editMode, setCheckMode] = useState(false);
  // eslint-disable-next-line
  const [user,setUser] = useState({
    id: props.userId,
    name: props.name,
    email: props.email
  })

  const handleChange = (e) => {
    console.log(e);
  }

  const deleteRow = async (rowId) => {

    try {
      let config = {
          method: 'DELETE',
          headers: {
              'Accept':'application/json',
              'Content-Type':'application/json'
          }
      }

      const response = await fetch(url+"/"+rowId,config);
      console.log(response);
      
      props.handleDelete(rowId);

  }catch(error){
      console.log(error);
  }
  }

  const close = () => {
    setCheckMode(false);
  }

  return(
    <tr>
      <th scope="row">{props.id + 1}</th>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>*******</td>
      <td className='d-flex' >
        <Button color="primary" onClick={() => setCheckMode(checkMode => !checkMode)} className='ms-auto me-1'>Editar</Button>
        <Button color="danger" onClick={() => deleteRow(props.userId)}>Eliminar</Button>
      </td>
      
      { !editMode ? "" :
            <MyModalEdit close={close} handleChange={handleChange} form={user} modalActualizar={editMode}></MyModalEdit>

          }
    </tr>
  )
}

function App() {
  const url = "http://localhost:7000/usuarios";
  const [usuarios,setUsuarios] = useState();
  // eslint-disable-next-line
  const[state, setState]=useState("")


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

  const updateUsuarios = (usuarios) => {
    setState({usuarios});
  }

  const deleteRow = (rowId) => {
    if(usuarios){
      let users = usuarios;
  
      for (let i = 0; i < users.length; i++) {
        const usuario = users[i];
        if(usuario.id === rowId){
          console.log("encontrado")
          users.splice(i,1);
        }
        
      }
      updateUsuarios(users);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          CRUD hecho con express.js y PostgreSQL
        </h1>
      </header>
      <Container>
        <div className='d-flex flex-wrap my-4'>
          { !usuarios ? "" :
            <MyModal stateChanger={updateUsuarios} usuarios={usuarios} />
          }
          
          { !usuarios ? 'Cargando...' : 
              <Tabla handleDelete={deleteRow} usuarios={usuarios} />
          }
        </div>
      </Container>
      <footer className='bg-dark d-flex align-items-center p-4'>
          <h4 className='text-white'>Hugo Iturrieta's work. v0.1</h4>
      </footer>
    </div>
  );
}


export default App;
