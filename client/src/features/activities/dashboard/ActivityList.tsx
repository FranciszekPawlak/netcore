import React from "react";
import { Item, Label, Button, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (
    event: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <>
      <Segment clearing>
        <Item.Group divided>
          {activities.length > 0
            ? activities.map((activity) => (
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
                        onClick={() => selectActivity(activity.id)}
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
