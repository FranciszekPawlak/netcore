import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route
        path={`/(.+)`}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route path="/activities" exact component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
