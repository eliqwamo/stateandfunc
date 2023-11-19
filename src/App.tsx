import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const App = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  //Functions
  //1. Simple Arrow Function
  const myFunction = () => {
    console.log("Hello from function");
  }
  myFunction();

  //2. Function that get parameters
  const add = (x,y) => {
    console.log(x + y);
  }
  //add(150,210);

  //3. Function get and return
const calculateTax = (income,tax) => {
  const result = income * tax;
  return result;
}
//calculateTax(1000,1.17);

const howMuchToPay = calculateTax(5980,1.17);
//toast.success(howMuchToPay.toFixed(2))

const clickHandler = () => {
  toast.success(`Hello ${firstName} ${lastName}`);
}

const greetingHandler = (daytime) => {
  toast.success(`${daytime} ${firstName} ${lastName}`);
}

const [dev, setDev] = useState(["Python","React Native","Java","C#","Swift","Kotlin","Dart"]);
const [isLoading, setIsLoading] = useState(false);

const addHandler = () => {
  setDev([...dev, firstName]);
  setFirstName("");
  toast.success("Saved");
}
const updateHandler = (value) => {
  setDev(dev.map(d => d === value ? 'Darta' : d));
}
const removeHandler = (value) => {
  setDev(dev.filter(d => d !== value));
}

const [pokemons, setPokemons] = useState([]);

const loadData = async() => {
  setIsLoading(true);
  const response = await axios('https://api.pokemontcg.io/v2/cards');
  if(response.status === 200){
    if(response.data.data.length > 0){
      setIsLoading(false);
      const data = response.data.data;
      setPokemons(data);
    } else {
      setIsLoading(false);
      toast.error('No data for you')
    }
  } else {
    setIsLoading(false);
    toast.error('Error while loading the data')
  }
}



  return(
    <>
      <Container>
        <ToastContainer />
        <Row>
          <Col lg={12}>
            <h1>Playing with State hook</h1><br/>
          
            {
              isLoading 
                ? <Spinner animation="border" variant="warning" /> 
                : <Button variant='success' onClick={loadData}>Load Data</Button>
            }

            {
              pokemons.length > 0 && <>
                {
                  pokemons.map((poke) => (
                    <p>{poke.name}</p>
                  ))
                }
              </>
            }
            <br/>
            


            {/* <Form>
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control 
                  type="text"
                  value={firstName}
                  onChange={(e) => {setFirstName(e.target.value)}}
                 />
              </Form.Group>

              <Form.Group>
              <Form.Label>Last name</Form.Label>
                <Form.Control 
                  type="text"
                  value={lastName}
                  onChange={(e) => {setLastName(e.target.value)}}
                 />
              </Form.Group>
            </Form>
            <br/>
            <p>{firstName} {lastName}</p>
            <Button variant='success' onClick={clickHandler}>Click Me!</Button><br/><br/>
            <Button variant='danger' 
              onClick={() => 
                {greetingHandler("Good evening")}}>Greeting!</Button>

            <br/><br/>

            {
              dev.map((item) => (
                <h2>{item} <Button onClick={() => {removeHandler(item)}} variant='danger'>X</Button></h2>
              ))
            }
            <br/>
            <Button variant='info' onClick={addHandler}>Add</Button>
            <Button variant='warning' onClick={() => {updateHandler("Dart")}}>Update</Button>
            <Button variant='danger' onClick={() => {removeHandler("Rust")}}>Delete</Button> */}


          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;