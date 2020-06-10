import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { activityContext } from "../../../app/store/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(activityContext);
  const {
    selectedActivity: activity,
    openEditForm,
    cancelSelectedActivity,
  } = activityStore;
  return (
    <>
      <Card fluid>
        <Image
          src={`/assets/images/categoryImages/${activity!.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>{activity!.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
            <Button
              basic
              color="blue"
              content="edit"
              onClick={() => openEditForm(activity!.id)}
            ></Button>
            <Button
              onClick={cancelSelectedActivity}
              basic
              color="grey"
              content="cancel"
            ></Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </>
  );
};
export default observer(ActivityDetails);
