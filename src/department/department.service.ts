import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Department,
  DepartmentModel,
  Subject,
  SubjectModel,
} from 'src/models/department.model';
import { CreateDepartmentInput } from './dto/department.input';
import { CreateSubjectInput } from './dto/subject.input';
import { DepartmentResponse } from './dto/department.response';
import { SubjectResponse } from './dto/subject.response';
import { SubjectsResponse } from './dto/subjects.response';
import { DepartmentsResponse } from './dto/all.department.response';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentModel>,
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<SubjectModel>,
  ) {}

  //validate department code
  async validateDeptCode(deptCode: string): Promise<boolean> {
    const department = await this.departmentModel.findOne({ deptCode }).exec();
    if (department) {
      return true;
    }
    return false;
  }

  // create new department
  async createDepartment(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<DepartmentResponse> {
    const response = new DepartmentResponse();
    const { deptName, deptCode, numberOfSemesters } = createDepartmentInput;

    this.validateDeptCode(deptCode).then((result) => {
      if (result) {
        response.message = 'Department already exists';
        response.success = false;
        return response;
      }
    });

    const department = await this.departmentModel.create({
      deptCode,
      deptName,
      numberOfSemesters,
    });
    if (!department) {
      response.message = 'Something went wrong';
      response.success = false;
      return response;
    }
    response.message = 'Department created successfully';
    response.success = true;
    response.result = department;
    return response;
  }

  // get departments
  async getDepartment(): Promise<DepartmentsResponse> {
    const response = new DepartmentsResponse();
    const departments = await this.departmentModel.find().exec();
    if (departments.length > 0) {
      response.message = 'Department fetched successfully';
      response.success = true;
      response.results = departments;
      return response;
    }
    else{
        response.message = 'No departments found';
        response.success = false;
        response.results = null;
        return response;
    }
  }

  //validate subject code
  async validateSubjectCode(subjectCode: string): Promise<boolean> {
    const subject = await this.subjectModel.findOne({ subjectCode }).exec();
    if (subject) {
      return true;
    }
    return false;
  }

  //get department from department
  async getDepartmentFromDeptCode(
    departmentId: string,
  ): Promise<DepartmentModel> {
    const department = await this.departmentModel.findById(departmentId).exec();
    if (!department) {
      return null;
    }
    return department;
  }

  // create a new subject
  async createSubjectInSemester(
    createSubjectInput: CreateSubjectInput,
  ): Promise<SubjectResponse> {
    const response = new SubjectResponse();
    const {
      department,
      semester,
      subjectName,
      subjectCode,
      subjectCredits,
      subjectDescription,
      subjectType,
    } = createSubjectInput;

    const validateSubject = await this.validateSubjectCode(subjectCode);

    if (validateSubject) {
      response.message = 'Subject already exists';
      response.success = false;
      response.result = null;
      return response;
    }

    const subject = await (
      await this.subjectModel.create({
        department,
        semester,
        subjectName,
        subjectType,
        subjectCode,
        subjectCredits,
        subjectDescription,
      })
    ).populate('department', 'subject');
    subject.department = await this.getDepartmentFromDeptCode(department);

    if (!subject) {
      response.message = 'Something went wrong';
      response.success = false;
      return response;
    }
    response.message = 'Subject created successfully';
    response.success = true;
    response.result = subject;
    return response;
  }

  // create multiple subjects
  async createMultipleSubjectsInSemester(
    createSubjectInput: CreateSubjectInput[],
  ): Promise<SubjectsResponse> {
    const response = new SubjectsResponse();
    const subjects = await this.subjectModel.create(createSubjectInput);
    if (!subjects) {
      response.message = 'Something went wrong';
      response.success = false;
      return response;
    }
    response.message = 'Subjects created successfully';
    response.success = true;
    response.result = subjects;
    return response;
  }

  //get all subjects
  async getAllSubjects(): Promise<SubjectsResponse> {
    const response = new SubjectsResponse();
    const subjects = await this.subjectModel.find().exec();
    if (!subjects) {
      response.message = 'No Subjects found';
      response.success = false;
      return response;
    }
    response.message = 'Subjects found';
    response.success = true;
    response.result = subjects;
    return response;
  }

  //get all subjects in a semester and department
  async getSubjectsInSemester(
    deptCode: string,
    inSemester: number,
  ): Promise<SubjectsResponse> {
    const response = new SubjectsResponse();
    const subjects = await this.subjectModel
      .find({ department: deptCode, semester: inSemester })
      .exec();
    if (!subjects) {
      response.message = 'No Subjects found';
      response.success = false;
      return response;
    }
    response.message = 'Subjects found';
    response.success = true;
    response.result = subjects;
    return response;
  }
}
