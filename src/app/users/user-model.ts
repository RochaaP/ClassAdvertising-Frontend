export class UserModel {
    adminFeatures: boolean;
  contact: string;
  create: firebase.firestore.Timestamp;
  email: string;
  firstname: string;
  img_url: string;
  lastname: string;
  role: string;
  verify: string;
  grade_level: string;
  metadata: string;
  units: string[];
}
