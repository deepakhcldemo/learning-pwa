export class Notes {
  flagged: boolean;
  noteid: number;
  comment: string;
}

export interface Student {
  avatar: string;
  emailAddress: string;
  firstName: string;
  fullName: string;
  lastName: string;
  userId: string;
  comment?: any;
  tagged?: boolean;
}

export interface NotesDetail {
  comment?: string;
  createdat?: any;
  flagged?: boolean;
  flaggeddate?: any;
  noteid?: number;
  noteId?: number;
  product?: string;
  classid?: string;
  student?: Array<Student>;
  students?: Array<string>;
  type?: string;
  types?: string;
  updatedat?: any;
  id?: string;

}

export interface NotesId {
  noteId: string;
}

export interface Note {
  id?: string;
  data?: NotesDetail;
  type?: string;
  details?: NotesDetail;
}

export interface NoteSearchDetail {
  type: string;
  details?: NotesDetail;
}

export interface NoteFormModel {
  comment: string;
  noteFlag: boolean;
  flaggedDate: string;
}

export interface StudentNoteDetails {
  id: string;
  data: NotesDetail;
}
