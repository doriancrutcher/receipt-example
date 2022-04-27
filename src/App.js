import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { login, logout } from "./utils";
import "./global.css";

// React Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Button,
} from "react-bootstrap";

export default function App() {
  const [receipt, changeReceipt] = useState("no Receipt");

  const onSubmit = async (e) => {
    e.preventDefault();

    let getInfo = await window.walletConnection.account().functionCall({
      contractId: "dev-1651082838869-52321307875583",
      methodName: "set_greeting",
      args: { message: "pokemon" },
    });

    changeReceipt(getInfo.receipts_outcome[0].id);
  };

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={"https://i.imgur.com/31dvjnh.png"}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link href='/NewPoll'>New Poll</Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login" : window.accountId}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant='top' src='holder.js/100px180' />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>{receipt}</Card.Text>
          <Button onClick={onSubmit} variant='primary'>
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}
