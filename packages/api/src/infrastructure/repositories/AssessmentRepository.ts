import { IAssessmentRepository } from '../../application/contracts';
import { Assessment as AssessmentType, CreateAssessmentDTO } from '../../types';
import { Assessment } from '../sequelize/models';

export class AssessmentRepository implements IAssessmentRepository {
  public async create(assessmentData: CreateAssessmentDTO): Promise<AssessmentType> {
    // TODO: Implement Create
    const createdAssessment = await Assessment.create(assessmentData);
    console.log(`Created assessment for db:`, createdAssessment);
    return createdAssessment;
  }

  public async findAll(): Promise<AssessmentType[]> {
    // TODO: Implement Find All

    const assessments = await Assessment.findAll({
      order: [[ `createdAt`, `DESC` ]],
    });
    console.log(`Found assessments:`, assessments);
    return assessments as AssessmentType[];
  }

  public async delete(id: number): Promise<boolean> {
    return Promise.reject(new Error(`Not implemented`));
  }
}
