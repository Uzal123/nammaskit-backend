// schema for teacher model
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { AllowedDepartment } from 'src/common/dto/allowed.departments.enum';
import { User} from './user.model';

@ObjectType()
@Schema({ timestamps: true })
export class Teacher {
    @Field(() => String, { description: 'The profileId id', nullable: false })
    _id: MongooseSchema.Types.ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Field(() => User)
    user: User | string;
    
    
    @Field(() => AllowedDepartment)
    @Prop({ required: true })
    department: AllowedDepartment;
    
    @Field(() => String)
    @Prop({ required: true })
    designation: String;
    
    @Field(() => String)
    @Prop({ required: true })
    qualification: String;
    
    @Field(() => String)
    @Prop({ required: true })
    experience: String;
    
    @Field(() => String)
    @Prop({ required: true })
    address: String;
}

export type TeacherModel = Document & Teacher;

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
