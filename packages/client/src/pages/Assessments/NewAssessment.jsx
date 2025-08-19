import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  return <Form onSubmit={(handleSubmit) => handleSubmit(onSubmit)}>

    <Form.Group controlId="CatName" classname="mb-3">
      <h1>Cat Assessment Infos</h1>
      <h2>Instrument</h2>
      Cat Behavioral Instrument

    </Form.Group>

    <Form.Group controlId="CatName" classname="mb-3">
      <h2> Cat Details </h2>
      <Form.Label>Cat Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Pet Name"
        value={Form.CatName}
      />
    </Form.Group>

    <Form.Group controlId="CatBirthday" classname="mb-3">
      <Form.Label>Cat Birthday</Form.Label>
      <Form.Control
        type="date"
        placeholder="Enter Pet Birthday"
        value={Form.CatBirthday}
        required
      />
    </Form.Group>

    <Form.Group controlId="CatJudicialContact" classname="mb-3">
      <h2>Questions</h2>
      <Form.Label>1. Previous contact with the Cat Judicial System</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="Yes"
          name="CatJudicialContact"
          id="CatJudicialContactYes"
          value="1"
        />
        <Form.Check
          type="radio"
          label="No"
          name="CatJudicialContact"
          id="CatJudicialContactNo"
          value="0"
        />
      </div>
    </Form.Group>

    <Form.Group controlId="PhysicalAltercation" classname="mb-3">
      <Form.Label>2. Physical altercations with other cats</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="3+"
          name="PhysicalAltercation"
          id="PhysicalAltercationYes"
          value="1"
        />
        <Form.Check
          type="radio"
          label="0-3"
          name="PhysicalAltercation"
          id="PhysicalAltercationNo"
          value="0"
        />
      </div>
    </Form.Group>

    <Form.Group controlId="OwnerAltercations" classname="mb-3">
      <Form.Label>3. Physical altercations with owner (scratching, biting, etc..)</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="10+"
          name="OwnerAltercations"
          id="OwnerAltercationsYes"
          value="1"
        />
        <Form.Check
          type="radio"
          label="0-10"
          name="OwnerAltercations"
          id="OwnerAltercationsYes"
          value="0"
        />
      </div>
    </Form.Group>

    <Form.Group controlId="DogPlay" classname="mb-3">
      <Form.Label>4. Plays well with dogs.</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="Yes"
          name="DogPlay"
          id="DogPlayYes"
          value="0"
        />
        <Form.Check
          type="radio"
          label="No"
          name="DogPlay"
          id="DogPlayNo"
          value="1"
        />
      </div>
    </Form.Group>

    <Form.Group controlId="HissesStrangers" classname="mb-3">
      <Form.Label>5. Hisses at strangers.</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="Yes"
          name="HissesStrangers"
          id="HissesStrangersYes"
          value="1"
        />
        <Form.Check
          type="radio"
          label="No"
          name="HissesStrangersNo"
          id="HissesStrangersNo"
          value="0"
        />
      </div>
    </Form.Group>

    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
