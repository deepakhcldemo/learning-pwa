import { TeacherClassModel } from './class.model';
import { ProgramModel } from './product-program.model';

export interface ProgramClassModel {
    productId: string;
    teacherClass: TeacherClassModel;
    program: ProgramModel;
    showArrow?: boolean;
    firstLevelHirerachy?: boolean;
    secondLevelHirerachy?: boolean;
}
