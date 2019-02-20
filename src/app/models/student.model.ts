
export interface Student {
  avatar: string;
  emailAddress: string;
  firstName: string;
  fullName: string;
  lastName: string;
  userId: string;
  tagged?: boolean;
  observed?: Array<any>;
  comment?: Array<any>;
}

export interface CurrentStudent {
  detail: {
    avatar: string;
    emailAddress: string;
    firstName: string;
    fullName: string;
    lastName: string;
    userId: string;
  };
  assessmentitem: any[];
}





