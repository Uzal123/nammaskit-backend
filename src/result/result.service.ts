import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result, ResultModel } from 'src/models/result.model';
import { CreateResultInput } from './dto/result.input';
import { StudentService } from 'src/student/student.service';
import { SemResultResponse } from './dto/result.response';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name)
    private readonly resultModel: Model<ResultModel>,
    private readonly studentService: StudentService,
  ) {}

  async getResultsByStudentId(studentId: string): Promise<Result[]> {
    const results = await this.resultModel
      .find({ student: studentId })
      .populate('student');
    return results;
  }

  async getResultByStudentIdAndSemester(
    studentId: string,
    semester: number,
  ): Promise<ResultModel> {
    const result = await this.resultModel
      .findOne({ student: studentId, semester })
      .populate('student');
    if (result) return result;
    return null;
  }

  async createResult(
    createResultInput: CreateResultInput,
  ): Promise<SemResultResponse> {
    const response = new SemResultResponse();
    const { studentId, semester, subjects } = createResultInput;

    const resultSementer = await this.getResultByStudentIdAndSemester(
      studentId,
      semester,
    );
    if (resultSementer) {
      if (semester === resultSementer.semester) {
        response.message = 'Result already exists';
        response.success = false;
        response.result = null;
        return response;
      }
    } else {
      const createdResult = await (
        await this.resultModel.create({
          student: studentId,
          semester,
          subjects,
        })
      ).populate('student');

      response.message = 'Result created successfully';
      response.success = true;
      response.result = createdResult;
      return response;
    }
  }
}
