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
import { UpdateSubjectInput } from './dto/update.subject.input';

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
  // total number of departments
  async totalDepartments(): Promise<number> {
    const departments = await this.departmentModel.countDocuments().exec();
    return departments;
  }

  // total number of subjects
  async totalSubjects(): Promise<number> {
    const totalSubjects = await this.subjectModel.countDocuments().exec();
    return totalSubjects;
  }

  // delete a department
  async deleteDepartment(departmentId: string): Promise<DepartmentResponse> {
    const response = new DepartmentResponse();
    const department = await this.departmentModel
      .findByIdAndDelete(departmentId)
      .exec();
    if (!department) {
      response.message = 'Department not found';
      response.success = false;
      return response;
    }
    response.message = 'Department deleted successfully';
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
    } else {
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
    ).populate(['department', 'subject']);
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

    const subjectCodes = createSubjectInput.map(
      (subject) => subject.subjectCode,
    );

    const validateSubject = await this.subjectModel
      .find({ subjectCode: { $in: subjectCodes } })
      .exec();

    if (validateSubject.length > 0) {
      console.log(validateSubject);
      response.message = 'Subject already exists';
      response.success = false;
      response.result = null;
      return response;
    }
    const createdSubjects = await this.subjectModel.create(createSubjectInput);

    const populatedSubjects = await this.subjectModel
      .find({ _id: { $in: createdSubjects.map((subject) => subject._id) } })
      .populate(['department']);

    if (!populatedSubjects) {
      response.message = 'Something went wrong';
      response.success = false;
      return response;
    }
    response.message = 'Subjects created successfully';
    response.success = true;
    response.result = populatedSubjects;
    return response;
  }

  //get all subjects
  async getAllSubjects(): Promise<SubjectsResponse> {
    const response = new SubjectsResponse();
    const subjects = await this.subjectModel
      .find()
      .populate('department')
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

  //get subject by id
  async getSubjectById(subjectId: string): Promise<SubjectResponse> {
    const response = new SubjectResponse();
    const subject = await this.subjectModel
      .findById(subjectId)
      .populate('department')
      .exec();
    if (!subject) {
      response.message = 'Subject not found';
      response.success = false;
      return response;
    }
    response.message = 'Subject found';
    response.success = true;
    response.result = subject;
    return response;
  }

  //get subject by subject code
  async getSubjectBySubjectCode(subjectCode: string): Promise<SubjectResponse> {
    const response = new SubjectResponse();
    const subject = await this.subjectModel
      .findOne({ subjectCode })
      .populate('department')
      .exec();
    if (!subject) {
      response.message = 'Subject not found';
      response.success = false;
      return response;
    }
    response.message = 'Subject found';
    response.success = true;
    response.result = subject;
    return response;
  }

  // delete a subject
  async deleteSubject(subjectId: string): Promise<SubjectResponse> {
    const response = new SubjectResponse();
    const subject = await this.subjectModel
      .findByIdAndDelete(subjectId)
      .populate('department')
      .exec();
    if (!subject) {
      response.message = 'Subject not found';
      response.success = false;
      return response;
    }
    response.message = 'Subject deleted successfully';
    response.success = true;
    response.result = subject;
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
      .populate('department')
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

  // update a subject
  async updateSubject(
    updateSubjectInput: UpdateSubjectInput,
  ): Promise<SubjectResponse> {
    const response = new SubjectResponse();
    const subject = await this.subjectModel
      .findOneAndUpdate(
        { _id: updateSubjectInput._id },
        {
          ...updateSubjectInput,
        },
        { new: true },
      )
      .populate('department')
      .exec();
    if (!subject) {
      response.message = 'Subject not found';
      response.success = false;
      return response;
    }
    response.message = 'Subject updated successfully';
    response.success = true;
    response.result = subject;
    return response;
  }
}
