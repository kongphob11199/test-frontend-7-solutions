import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserServiceClient as _proto_UserServiceClient, UserServiceDefinition as _proto_UserServiceDefinition } from './proto/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  proto: {
    Empty: MessageTypeDefinition
    UserService: SubtypeConstructor<typeof grpc.Client, _proto_UserServiceClient> & { service: _proto_UserServiceDefinition }
    Users: MessageTypeDefinition
    UsersAddress: MessageTypeDefinition
    UsersCompany: MessageTypeDefinition
    UsersHair: MessageTypeDefinition
    UsersResponse: MessageTypeDefinition
  }
}

