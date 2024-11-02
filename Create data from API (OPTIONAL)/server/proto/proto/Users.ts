// Original file: ../proto/user.proto

import type { UsersHair as _proto_UsersHair, UsersHair__Output as _proto_UsersHair__Output } from '../proto/UsersHair';
import type { UsersAddress as _proto_UsersAddress, UsersAddress__Output as _proto_UsersAddress__Output } from '../proto/UsersAddress';
import type { UsersCompany as _proto_UsersCompany, UsersCompany__Output as _proto_UsersCompany__Output } from '../proto/UsersCompany';

export interface Users {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'age'?: (number);
  'gender'?: (string);
  'hair'?: (_proto_UsersHair | null);
  'department'?: (string);
  'address'?: (_proto_UsersAddress | null);
  'company'?: (_proto_UsersCompany | null);
}

export interface Users__Output {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'age'?: (number);
  'gender'?: (string);
  'hair'?: (_proto_UsersHair__Output);
  'department'?: (string);
  'address'?: (_proto_UsersAddress__Output);
  'company'?: (_proto_UsersCompany__Output);
}
