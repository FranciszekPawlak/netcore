import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { activityContext } from "../../app/store/activityStore";

const NavBar: React.FC = () => {
  const activityStore = useContext(activityContext);
  return (
    <>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img
              src="/assets/images/logo.png"
              alt="logo"
              style={{ marginRight: 10 }}
            />
            Reactivities
          </Menu.Item>
          <Menu.Item name="Activities" />
          <Menu.Item>
            <Button
              onClick={activityStore.operCreateForm}
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
