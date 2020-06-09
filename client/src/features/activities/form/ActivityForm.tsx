import React, { useState, FormEvent, ChangeEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
}) => {
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
    console.log(e.currentTarget, name, value);
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    console.log(activity);

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
          <Button floated="right" positive type="Submit" content="Submit" />
          <Button
            onClick={() => setEditMode(false)}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </Segment>
    </>
  );
};
