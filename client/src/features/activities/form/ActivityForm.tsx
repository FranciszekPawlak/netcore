import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { activityContext } from "../../../app/store/activityStore";

interface IProps {
  activity: IActivity | null;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
  const activityStore = useContext(activityContext);
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen,
  } = activityStore;

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };
  return (
    <>
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            onChange={handleInputChange}
            name="title"
            placeholder="Title"
            value={activity.title}
          />
          <Form.TextArea
            onChange={handleInputChange}
            rows={2}
            placeholder="Description"
            name="description"
            value={activity.description}
          />
          <Form.Input
            onChange={handleInputChange}
            placeholder="Category"
            name="category"
            value={activity.category}
          />
          <Form.Input
            onChange={handleInputChange}
            placeholder="Date"
            name="date"
            type="datetime-local"
            value={activity.date}
          />
          <Form.Input
            placeholder="City"
            name="city"
            value={activity.city}
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="Venue"
            name="venue"
            value={activity.venue}
            onChange={handleInputChange}
          />
          <Button
            loading={submitting}
            floated="right"
            positive
            type="Submit"
            content="Submit"
          />
          <Button
            loading={submitting}
            onClick={cancelFormOpen}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </Segment>
    </>
  );
};
export default observer(ActivityForm);
