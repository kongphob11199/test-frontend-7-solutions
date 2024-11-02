// Original file: ../proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _proto_Empty, Empty__Output as _proto_Empty__Output } from '../proto/Empty';
import type { UsersResponse as _proto_UsersResponse, UsersResponse__Output as _proto_UsersResponse__Output } from '../proto/UsersResponse';

export interface UserServiceClient extends grpc.Client {
  GetUsers(argument: _proto_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_UsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _proto_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_proto_UsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _proto_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_UsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _proto_Empty, callback: grpc.requestCallback<_proto_UsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _proto_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_UsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _proto_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_proto_UsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _proto_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_UsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _proto_Empty, callback: grpc.requestCallback<_proto_UsersResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  GetUsers: grpc.handleUnaryCall<_proto_Empty__Output, _proto_UsersResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  GetUsers: MethodDefinition<_proto_Empty, _proto_UsersResponse, _proto_Empty__Output, _proto_UsersResponse__Output>
}
