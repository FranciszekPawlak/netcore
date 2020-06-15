import React, { useContext } from "react";
import { Item, Label, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { activityContext } from "../../../app/store/activityStore";
import { Link } from "react-router-dom";

const ActivityList: React.FC = () => {
  const activityStore = useContext(activityContext);
  const {
    activitiesByDate,
    submitting,
    target,
    deleteActivity,
  } = activityStore;
  return (
    <>
      <Segment clearing>
        <Item.Group divided>
          {activitiesByDate.length > 0
            ? activitiesByDate.map((activity) => (
                <Item key={activity.id}>
                  <Item.Content>
                    <Item.Header as="a">{activity.title}</Item.Header>
                    <Item.Meta>Date</Item.Meta>
                    <Item.Description>
                      <div>{activity.description}</div>
                      <div>
                        {activity.city}, {activity.venue}
                      </div>
                    </Item.Description>
                    <Item.Extra>
                      <Button
                        floated="right"
                        content="View"
                        color="blue"
                        loading={submitting}
                        as={Link}
                        to={`/activities/${activity.id}`}
                      ></Button>
                      <Button
                        name={activity.id}
                        loading={target === activity.id && submitting}
                        floated="right"
                        content="Delete"
                        color="red"
                        onClick={(e) => deleteActivity(e, activity.id)}
                      ></Button>
                      <Label basic content={activity.category}></Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))
            : null}
        </Item.Group>
      </Segment>
    </>
  );
};
export default observer(ActivityList);
