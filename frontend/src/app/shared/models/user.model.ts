export interface User {
  id:bigint;
  fullname:string;
  nom:string;
  prenom:string;
  email:string;
  suspended:boolean;
  createdBy:string;
  lastmodifiedBy:string;
  roles:{}
}
