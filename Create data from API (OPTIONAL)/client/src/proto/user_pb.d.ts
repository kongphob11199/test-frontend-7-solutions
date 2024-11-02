import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class UsersResponse extends jspb.Message {
  getUsersList(): Array<Users>;
  setUsersList(value: Array<Users>): UsersResponse;
  clearUsersList(): UsersResponse;
  addUsers(value?: Users, index?: number): Users;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UsersResponse): UsersResponse.AsObject;
  static serializeBinaryToWriter(message: UsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsersResponse;
  static deserializeBinaryFromReader(message: UsersResponse, reader: jspb.BinaryReader): UsersResponse;
}

export namespace UsersResponse {
  export type AsObject = {
    usersList: Array<Users.AsObject>,
  }
}

export class Users extends jspb.Message {
  getId(): number;
  setId(value: number): Users;

  getFirstname(): string;
  setFirstname(value: string): Users;

  getLastname(): string;
  setLastname(value: string): Users;

  getAge(): number;
  setAge(value: number): Users;

  getGender(): string;
  setGender(value: string): Users;

  getHair(): UsersHair | undefined;
  setHair(value?: UsersHair): Users;
  hasHair(): boolean;
  clearHair(): Users;

  getDepartment(): string;
  setDepartment(value: string): Users;

  getAddress(): UsersAddress | undefined;
  setAddress(value?: UsersAddress): Users;
  hasAddress(): boolean;
  clearAddress(): Users;

  getCompany(): UsersCompany | undefined;
  setCompany(value?: UsersCompany): Users;
  hasCompany(): boolean;
  clearCompany(): Users;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Users.AsObject;
  static toObject(includeInstance: boolean, msg: Users): Users.AsObject;
  static serializeBinaryToWriter(message: Users, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Users;
  static deserializeBinaryFromReader(message: Users, reader: jspb.BinaryReader): Users;
}

export namespace Users {
  export type AsObject = {
    id: number,
    firstname: string,
    lastname: string,
    age: number,
    gender: string,
    hair?: UsersHair.AsObject,
    department: string,
    address?: UsersAddress.AsObject,
    company?: UsersCompany.AsObject,
  }
}

export class UsersHair extends jspb.Message {
  getColor(): string;
  setColor(value: string): UsersHair;

  getType(): string;
  setType(value: string): UsersHair;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsersHair.AsObject;
  static toObject(includeInstance: boolean, msg: UsersHair): UsersHair.AsObject;
  static serializeBinaryToWriter(message: UsersHair, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsersHair;
  static deserializeBinaryFromReader(message: UsersHair, reader: jspb.BinaryReader): UsersHair;
}

export namespace UsersHair {
  export type AsObject = {
    color: string,
    type: string,
  }
}

export class UsersAddress extends jspb.Message {
  getPostalcode(): string;
  setPostalcode(value: string): UsersAddress;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsersAddress.AsObject;
  static toObject(includeInstance: boolean, msg: UsersAddress): UsersAddress.AsObject;
  static serializeBinaryToWriter(message: UsersAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsersAddress;
  static deserializeBinaryFromReader(message: UsersAddress, reader: jspb.BinaryReader): UsersAddress;
}

export namespace UsersAddress {
  export type AsObject = {
    postalcode: string,
  }
}

export class UsersCompany extends jspb.Message {
  getDepartment(): string;
  setDepartment(value: string): UsersCompany;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsersCompany.AsObject;
  static toObject(includeInstance: boolean, msg: UsersCompany): UsersCompany.AsObject;
  static serializeBinaryToWriter(message: UsersCompany, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsersCompany;
  static deserializeBinaryFromReader(message: UsersCompany, reader: jspb.BinaryReader): UsersCompany;
}

export namespace UsersCompany {
  export type AsObject = {
    department: string,
  }
}

