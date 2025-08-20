import { inject, injectable } from 'inversify';
import { IUseCase } from 'src/types/shared';
import { Assessment, CreateAssessmentDTO } from 'src/types';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class CreateAssessmentUseCase implements IUseCase<CreateAssessmentDTO, Assessment> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(assessmentData: CreateAssessmentDTO): Promise<Assessment> {
    // TODO: Implement business validation logic here
    console.log(`Executing CreateAssessmentUseCase with data:`, assessmentData);
    const { score } = assessmentData;
    if (score < 0 || score > 5) {
      return Promise.reject(new Error(`Score must be between 0 and 5`));
    }
    const validRiskLevels = [ `low`, `medium`, `high` ];
    if (!validRiskLevels.includes(assessmentData.riskLevel)) {
      return Promise.reject(new Error(`Risk level must be one of: ${validRiskLevels.join(`, `)}`));
    }
    const database = await this.assessmentRepository.create(assessmentData);
    return database;
  }

  // HINT: Validate that the score is between 0 and 5
  // HINT: Validate that the risk level matches the score calculation

  // TODO: Create the assessment using the repository

  // TODO: Add private helper methods for validation and risk level calculation
}
