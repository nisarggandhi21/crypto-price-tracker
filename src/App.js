import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { Navbar, Container, Button, Nav } from "react-bootstrap";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";

import Tracker from "./Tracker";
import Buynow from "./Buynow";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  var provider = new firebase.auth.GoogleAuthProvider();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // FIR Auth State Observer
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        console.log(`User has signed in with UID: ${uid}`);
        setUser(uid);
      } else {
        // User is signed out
        console.log("User is not signed in.");
        setUser(null);
      }
    });
  }, []);

  function signInWithGooglePopUp() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("User has signed in.");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(
          `Errors occurred during sign in: ${errorCode}, ${errorMessage}, ${email}, ${credential}`
        );
      });
  }

  return (
    <div className={classes.root}>
      <Router>
        <Navbar>
          <Container>
            <Navbar.Brand className="Nav__head">
              <Nav.Link as={Link} to={"/"} className="Nav__Link">
                Crypto Price Tracker
              </Nav.Link>
            </Navbar.Brand>
            <Nav.Link as={Link} to={"/buynow"} className="Nav__Link">
              Buy Crypto Now
            </Nav.Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="User__name">
                {user ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1">{user}</Typography>
                    <Button
                      onClick={() => {
                        // signout
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            console.log("User has signed out.");
                          })
                          .catch((err) => {
                            console.log("Error signing out: ", err);
                          });
                      }}
                    >
                      Signout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      signInWithGooglePopUp();
                    }}
                  >
                    Login
                  </Button>
                )}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/buynow">
            <Buynow />
          </Route>
          <Route path="/">
            <Tracker />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
