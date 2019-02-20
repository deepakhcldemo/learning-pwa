import { FileConstants } from '../shared/constants/file-constants';
import { Student } from './notes.model';

/**
 * Media Model generalized form.
 */
export class Media {
  mediaKind: string;
  mediaId: Number;
  createDate: Date;
  updateDate: Date;
}

/**
 * Media Model to set data in IndexDB.
 */
export class MediaMetaData {
  createdat?: { seconds: number, nanoseconds: number };
  updatedat?: { seconds: number, nanoseconds: number };
  mediaId?: string;
  mediakind?: string;
  classid?: string;
  mediaDescription?: string;
  caption?: string;
  path?: string;
  encodedPath?: string;
  teacherId?: string;
  students?: Array<string>;
  synced?: boolean;
  isFound?: boolean;
  type?: string;
  productId?: string;
  mapped?: boolean;
  mediadocid?: string | number;

  constructor(
    mediaId, mediaType, classid, mediadescription, caption, path, encodedPath, teacherid, students) {
    this.createdat = {
      seconds: new Date().getTime() / FileConstants.constants.secondsCount,
      nanoseconds: new Date().getTime() / FileConstants.constants.nanoSecondsCount
    };
    this.updatedat = {
      seconds: new Date().getTime() / FileConstants.constants.secondsCount,
      nanoseconds: new Date().getTime() / FileConstants.constants.nanoSecondsCount
    };
    this.mediaId = mediaId;
    this.mediakind = mediaType;
    this.classid = classid;
    this.mediaDescription = mediadescription;
    this.caption = caption;
    this.path = path;
    this.encodedPath = encodedPath;
    this.teacherId = teacherid;
    this.students = students;
  }
}

/**
 * MeTime Model to set data according to Firebase.
 */
export interface Time {
  seconds: number;
  nanoseconds: number;
}

/**
 * Media Model to set data with studentID's.
 */
export interface MediaMetaDataWithStudentsList {
  media: MediaMetaData;
  students: Array<Student>;
  parent?: string;
}

/**
 * Media Model to set data as per assessment type.
 */
export interface MediaDetail {
  type: string;
  details: MediaMetaData;
}

/**
 * Media Model to set alert in global popup.
 */
export interface ModalAlertOption {
  status: string;
  message: string;
  code: string;
}

/**
 * Media update details Model
 */
export interface MediaUpdateDetails {
  caption?: string;
  mediaDescription?: string;
  students: Array<string>;
  updatedat?: Date;
}

/**
 * Media tab status Model
 */
export interface MediaTabStatus {
  currentLevel: boolean;
  parentLevel: number;
}
