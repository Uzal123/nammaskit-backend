import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result, ResultModel } from 'src/models/result.model';
import { CreateResultInput } from './dto/result.input';
import { StudentService } from 'src/student/student.service';
import { ResultResponse } from './dto/result.response';
import { ResultsResponse } from './dto/all.result.response';
import { DepartmentService } from 'src/department/department.service';
import { ResultType } from 'src/common/dto/result.type.enum';
import { UpdateResultInput } from './dto/update.result.input';
import { CreateAttendanceInput } from './dto/attendance.input';
import { Attendance, AttendanceModel } from 'src/models/attendance.model';
import { AttendanceResponse } from './dto/attendance.response';
import { AttendancesResponse } from './dto/attendances.response';
import { UpdateAttendanceInput } from './dto/update.attendance.input';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name)
    private readonly resultModel: Model<ResultModel>,
    @InjectModel(Attendance.name)
    private readonly attendanceModel: Model<AttendanceModel>,
    private readonly departmentService: DepartmentService,
    private readonly studentService: StudentService,
  ) {}

  async getResultByStudentIdAndSemester(
    studentId: string,
    subjectId: string,
    resultType: ResultType,
  ): Promise<ResultModel> {
    const result = await this.resultModel
      .findOne({
        student: studentId,
        subject: subjectId,
        resultType: resultType,
      })
      .populate(['student', 'subject']);
    if (result) return result;
    return null;
  }

  async getResultById(resultId: string): Promise<ResultResponse> {
    const response = new ResultResponse();
    const result = await this.resultModel

      .findOne({ _id: resultId })
      .populate(['student', 'subject']);
    if (!result) {
      response.message = 'Result not found';
      response.success = false;
      response.result = null;
      return response;
    }
    response.message = 'Result found';
    response.success = true;
    response.result = result;
    return response;
  }

  // create result
  //   async createResult(
  //     createResultInput: CreateResultInput,
  //   ): Promise<ResultResponse> {
  //     const response = new ResultResponse();
  //     const student = await this.studentService.getStudentById(
  //       createResultInput.student,
  //     );

  //     if (!student.success) {
  //       response.message = 'Student not found';
  //       response.success = false;
  //       response.result = null;
  //       return response;
  //     }

  //     const subject = await this.departmentService.getSubjectById(
  //       createResultInput.subject,
  //     );

  //     if (!subject.success) {
  //       response.message = 'Subject not found';
  //       response.success = false;
  //       response.result = null;
  //       return response;
  //     }

  //     const resultExists = await this.getResultByStudentIdAndSemester(
  //       createResultInput.student,
  //       createResultInput.subject,
  //       createResultInput.resultType,
  //     );
  //     if (resultExists) {
  //       response.message = 'Result already exists';
  //       response.success = false;
  //       response.result = null;
  //       return response;
  //     }

  //     const result = await (
  //       await this.resultModel.create({
  //         ...createResultInput,
  //         student: student.student,
  //       })
  //     ).populate(['student', 'subject']);
  //     response.message = 'Result created successfully';
  //     response.success = true;
  //     response.result = result;
  //     return response;
  //   }

  // create multiple results
  async createMultipleResults(
    createResultInput: CreateResultInput[],
  ): Promise<ResultsResponse> {
    const response = new ResultsResponse();
    const results = [];
    for (const result of createResultInput) {
      const student = await this.studentService.getStudentByUSN(result.usn);
      if (!student.success) {
        response.message = 'Student not found';
        response.success = false;
        response.results = null;
        return response;
      }

      const subject = await this.departmentService.getSubjectBySubjectCode(
        result.subjectCode,
      );

      if (!subject.success) {
        response.message = 'Subject not found';
        response.success = false;
        response.results = null;
        return response;
      }

      const resultExists = await this.getResultByStudentIdAndSemester(
        student.student._id.toString(),
        subject.result._id.toString(),
        result.resultType,
      );
      if (resultExists) {
        response.message = 'Result already exists';
        response.success = false;
        response.results = null;
        return response;
      }
      const newResult = await (
        await this.resultModel.create({
          ...result,
          student: student.student,
          subject: subject.result,
        })
      ).populate(['student', 'subject']);
      results.push(newResult);
    }
    response.message = 'Results created successfully';
    response.success = true;
    response.results = results;
    return response;
  }

  // update result
  async updateResult(
    updateResultInput: UpdateResultInput,
  ): Promise<ResultResponse> {
    const response = new ResultResponse();
    const result = await this.resultModel
      .findOne({ _id: updateResultInput._id })
      .populate(['student', 'subject']);
    if (!result) {
      response.message = 'Result not found';
      response.success = false;
      response.result = null;
      return response;
    }
    const updatedResult = await this.resultModel
      .findByIdAndUpdate(
        updateResultInput._id,
        { ...updateResultInput },
        { new: true },
      )
      .populate(['student', 'subject']);
    response.message = 'Result updated successfully';
    response.success = true;
    response.result = updatedResult;
    return response;
  }

  // delete result
  async deleteResult(resultId: string): Promise<ResultResponse> {
    const response = new ResultResponse();
    const result = await this.resultModel
      .findOne({ _id: resultId })
      .populate(['student', 'subject']);
    if (!result) {
      response.message = 'Result not found';
      response.success = false;
      response.result = null;
      return response;
    }
    const deletedResult = await this.resultModel.findByIdAndDelete(resultId);
    response.message = 'Result deleted successfully';
    response.success = true;
    response.result = deletedResult;
    return response;
  }

  // get results by studentId
  async getResultsByStudentId(studentId: string): Promise<ResultsResponse> {
    const response = new ResultsResponse();
    const results = await this.resultModel
      .find({ student: studentId })
      .populate(['student', 'student.user', 'subject']);
    if (!results) {
      response.message = 'Results not found';
      response.success = false;
      response.results = null;
      return response;
    }
    response.message = 'Results found';
    response.success = true;
    response.results = results;
    return response;
  }

  // get results by student id and result type and semester
  async getResultsByStudentIdAndResultTypeAndSemester(
    studentId: string,
    resultType: ResultType[],
    semester: number,
  ): Promise<ResultsResponse> {
    const response = new ResultsResponse();
    const results = await this.resultModel
      .find({
        student: studentId,
        resultType: { $in: resultType },
      })
      .populate(['student', 'student.user', 'subject']);

    const filterdResults = results.filter(
      (result) => result.subject.semester === semester,
    );
    if (!results) {
      response.message = 'Results not found';
      response.success = false;
      response.results = null;
      return response;
    }
    response.message = 'Results found';
    response.success = true;
    response.results = filterdResults;
    return response;
  }

  // create attendance
  async createAttendance(
    createAttendanceInput: CreateAttendanceInput,
  ): Promise<AttendanceResponse> {
    const response = new AttendanceResponse();

    const attendanceExists = await this.attendanceModel.findOne({
      student: createAttendanceInput.student,
      subject: createAttendanceInput.subject,
      attendanceFor: createAttendanceInput.attendanceFor,
    });

    if (attendanceExists) {
      response.message = 'Attendance already exists';
      response.success = false;
      response.attendance = null;
      return response;
    }

    const attendance = await this.attendanceModel.create({
      ...createAttendanceInput,
    });
    response.message = 'Attendance created successfully';
    response.success = true;
    response.attendance = attendance;
    return response;
  }

  // get attendance by student id and attendance for
  async getAttendanceByStudentIdAndAttendanceFor(
    studentId: string,
    attendanceFor: ResultType,
  ): Promise<AttendancesResponse> {
    const response = new AttendancesResponse();
    const attendance = await this.attendanceModel.find({
      student: studentId,
      attendanceFor: attendanceFor,
    });
    if (!attendance) {
      response.message = 'Attendance not found';
      response.success = false;
      response.attendances = null;
      return response;
    }
    response.message = 'Attendance found';
    response.success = true;
    response.attendances = attendance;
    return response;
  }

  //update attendance by attendanceId
  async updateByAttendanceId(
    updateAttendanceInput: UpdateAttendanceInput,
  ): Promise<AttendanceResponse> {
    const response = new AttendanceResponse();
    const attendance = await this.attendanceModel
      .findOne({ _id: updateAttendanceInput.id })
      .populate(['student', 'subject']);
    if (!attendance) {
      response.message = 'Attendance not found';
      response.success = false;
      response.attendance = null;
      return response;
    }
    const updatedAttendance = await this.attendanceModel

      .findByIdAndUpdate(
        updateAttendanceInput.id,
        { ...updateAttendanceInput },
        { new: true },
      )
      .populate(['student', 'subject']);
    response.message = 'Attendance updated successfully';
    response.success = true;
    response.attendance = updatedAttendance;
    return response;
  }

  // delete attendance by attendanceId
  async deleteAttendance(attendanceId: string): Promise<AttendanceResponse> {
    const response = new AttendanceResponse();
    const attendance = await this.attendanceModel
      .findOne({ _id: attendanceId })
      .populate(['student', 'subject']);
    if (!attendance) {
      response.message = 'Attendance not found';
      response.success = false;
      response.attendance = null;
      return response;
    }
    const deletedAttendance = await this.attendanceModel.findByIdAndDelete(
      attendanceId,
    );
    response.message = 'Attendance deleted successfully';
    response.success = true;
    response.attendance = deletedAttendance;
    return response;
  }
}
