import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import * as authActions from "../../../Redux/slices/auth/authActions";
import { UserContext } from "../../../App";
import "./Header.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector(({ auth }) => auth);

  if (!user) history.push("/login");
  const handleLogout = () => {
    dispatch(authActions.logutUser());
  };

  return (
    <>
      <Navbar collapseOnSelect expand="sm" expanded={true}>
        <Container fluid>
          <div className="navbar-inner">
            <div className="navbar-logowraps">
              <Navbar.Brand className="brand">Kanban Board</Navbar.Brand>
            </div>
            {user && (
              <div className="">
                <span style={{ marginRight: "10px" }}>
                  Welcome <b>{user?.name}</b>
                </span>

                {user?.profileImage && (
                  <img
                    alt="profile_image"
                    src={user.profileImage}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                    title={user.email}
                  />
                )}
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
            {!user && (
              <div className="">
                <Button
                  variant="secondary"
                  onClick={() => history.push("/login")}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
