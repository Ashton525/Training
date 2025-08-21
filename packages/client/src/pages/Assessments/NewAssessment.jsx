import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';
import '../../style.css';

export const NewAssessment = () => {
  const { handleSubmit, register } = useForm();
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const calculateScoreAndRisk = (data) => {
    const yesNoFields = [ `CatJudicialContact`, `DogPlay`, `HissesStrangers`, `OwnerAltercations`, `PhysicalAltercation` ];
    const score = yesNoFields.reduce((sum, field) => sum + parseInt(data[field] || `0`, 10), 0);
    let riskLevel = `low`;
    if (score >= 0 && score <= 1) {
      riskLevel = `low`;
    } else if (score >= 2 && score <= 3) {
      riskLevel = `medium`;
    } else if (score >= 4 && score <= 5) {
      riskLevel = `high`;
    }
    return { riskLevel, score };
  };

  const onSubmit = async (data) => {
    const { riskLevel, score } = calculateScoreAndRisk(data);
    const { catDateOfBirth, catName, instrumentType } = data;
    const finalData = {
      catDateOfBirth,
      catName,
      instrumentType,
      riskLevel,
      score,
    };
    console.log(`Form Data:`, finalData);
    await AssessmentService.submit(finalData);
  };

  return <Form onSubmit={handleSubmit(onSubmit, (err) => console.error(err))}>

    <Form.Group controlId="Instrument" className="mb-4">
      <div className="border border-dark rounded p-4">
        <h1 className="underline-custom">Cat Assessment Info</h1>
      </div>
      <Form.Control
        type="hidden"
        defaultValue={1}
        {...register(`instrumentType`, { required: true }, { valueAsNumber: true })}
      />

    </Form.Group>

    <Form.Group controlId="catName" className="mb-3">
      <h2 className="p-0 mb-4"> Cat Details </h2>
      <Form.Label>
        <h3>Cat Name</h3>
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Pet Name"
        {...register(`catName`, { required: true })}
      />
    </Form.Group>

    <Form.Group controlId="CatDateOfBirth" className="mb-3">
      <Form.Label>
        <h3>Cat Birthday</h3>
      </Form.Label>
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

    <Button className="btn btn-danger" type="submit">Submit</Button>

  </Form>;
};
