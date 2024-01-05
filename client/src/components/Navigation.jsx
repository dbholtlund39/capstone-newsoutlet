import React from "react"
import { NavLink, Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="mr-auto">
          <Navbar.Brand as={Link} to="/">
            <img alt="" src="roundedLogo.png" width="120" height="140" />{" "}
          </Navbar.Brand >

          <Nav.Item className="homeLink">
            <Nav.Link as={NavLink} to="/" exact="true">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="localLink">
            <Nav.Link as={NavLink} to="/local-news">
              Local News
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="natLink">
            <Nav.Link as={NavLink} to="/national-news">
              National News
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="worldLink">
            <Nav.Link as={NavLink} to="/world-news">
              World News
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="stocksLink">
            <Nav.Link as={NavLink} to="/stocks">
              Stocks
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="sportsLink">
            <Nav.Link as={NavLink} to="/sports">
              Sports
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="weatherLink">
            <Nav.Link as={NavLink} to="/weather">
              Weather
            </Nav.Link>
          </Nav.Item>

          <Nav className="userProfileLink">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user-profile">
                User Profile
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation

