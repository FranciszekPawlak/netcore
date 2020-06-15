import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  return (
    <>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to="/">
            <img
              src="/assets/images/logo.png"
              alt="logo"
              style={{ marginRight: 10 }}
            />
            Reactivities
          </Menu.Item>
          <Menu.Item name="Activities" as={NavLink} to="/activities" />
          <Menu.Item>
            <Button
              as={NavLink}
              to="/createActivity"
              positive
              content="Create activity"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </>
  );
};

export default observer(NavBar);
