import { Document } from "mongoose";
import { Role } from "../../auth/roles/role.enum";

export default interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
}
