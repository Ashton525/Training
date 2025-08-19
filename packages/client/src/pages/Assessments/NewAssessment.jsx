import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const { handleSubmit, register } = useForm();
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    console.log(`Form Data:`, data);
    await AssessmentService.submit(data);
  };

  return <Form onSubmit={(handleSubmit(onSubmit))}>

    <Form.Group controlId="Instrument" className="mb-3">
      <h1>Cat Assessment Infos</h1>
      <Form.Label>Instrument</Form.Label>
      <Form.Control
        type="hidden"
        defaultValue={1}
        {...register(`instrument`, { required: true, valueAsNumber: true })}

      />

    </Form.Group>

    <Form.Group controlId="catName" className="mb-3">
      <h2> Cat Details </h2>
      <Form.Label>Cat Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Pet Name"
        {...register(`catName`, { required: true })}
      />
    </Form.Group>

    <Form.Group controlId="CatDateOfBirth" className="mb-3">
      <Form.Label>Cat Birthday</Form.Label>
      <Form.Control
        type="date"
        {...register(`catDateOfBirth`, { required: true })}
      />
    </Form.Group>

    <Form.Group controlId="CatJudicialContact" className="mb-3">
      <h2>Questions</h2>
      <Form.Label>1. Previous contact with the Cat Judicial System</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="Yes"
          {...register(`CatJudicialContact`)}
          value="1"
        />
        <Form.Check
          type="radio"
          label="No"
          {...register(`CatJudicialContact`)}
          value="0"
        />
      </div>
    </Form.Group>

    <Form.Group controlId="PhysicalAltercation" className="mb-3">
      <Form.Label>2. Physical altercations with other cats</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="3+"
          {...register(`PhysicalAltercation`)}
          value="1"
        />
        <Form.Check
          type="radio"
          label="0-3"
          {...register(`PhysicalAltercation`)}
          value="0"
        />
      </div>
    </Form.Group>

    <Form.Group controlId="OwnerAltercations" className="mb-3">
      <Form.Label>3. Physical altercations with owner (scratching, biting, etc..)</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="10+"
          {...register(`OwnerAltercations`)}
          value="1"
        />
        <Form.Check
          type="radio"
          label="0-10"
          {...register(`OwnerAltercations`)}
          value="0"
        />
      </div>
    </Form.Group>

    <Form.Group controlId="DogPlay" className="mb-3">
      <Form.Label>4. Plays well with dogs.</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="Yes"
          {...register(`DogPlay`)}
          value="0"
        />
        <Form.Check
          type="radio"
          label="No"
          {...register(`DogPlay`)}
          value="1"
        />
      </div>
    </Form.Group>

    <Form.Group controlId="HissesStrangers" className="mb-3">
      <Form.Label>5. Hisses at strangers.</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="Yes"
          {...register(`HissesStrangers`)}
          value="1"
        />
        <Form.Check
          type="radio"
          label="No"
          {...register(`HissesStrangers`)}
          value="0"
        />
      </div>
    </Form.Group>

    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
