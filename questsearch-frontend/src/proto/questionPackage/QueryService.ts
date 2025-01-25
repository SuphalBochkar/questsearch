// Original file: proto/questions.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CategoryQuery as _questionPackage_CategoryQuery, CategoryQuery__Output as _questionPackage_CategoryQuery__Output } from '../questionPackage/CategoryQuery';
import type { QueryResponse as _questionPackage_QueryResponse, QueryResponse__Output as _questionPackage_QueryResponse__Output } from '../questionPackage/QueryResponse';
import type { TitleCategoryQuery as _questionPackage_TitleCategoryQuery, TitleCategoryQuery__Output as _questionPackage_TitleCategoryQuery__Output } from '../questionPackage/TitleCategoryQuery';
import type { TitleQuery as _questionPackage_TitleQuery, TitleQuery__Output as _questionPackage_TitleQuery__Output } from '../questionPackage/TitleQuery';

export interface QueryServiceClient extends grpc.Client {
  FetchQuestionsByCategory(argument: _questionPackage_CategoryQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByCategory(argument: _questionPackage_CategoryQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByCategory(argument: _questionPackage_CategoryQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByCategory(argument: _questionPackage_CategoryQuery, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByCategory(argument: _questionPackage_CategoryQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByCategory(argument: _questionPackage_CategoryQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByCategory(argument: _questionPackage_CategoryQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByCategory(argument: _questionPackage_CategoryQuery, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  
  FetchQuestionsByTitle(argument: _questionPackage_TitleQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByTitle(argument: _questionPackage_TitleQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByTitle(argument: _questionPackage_TitleQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByTitle(argument: _questionPackage_TitleQuery, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByTitle(argument: _questionPackage_TitleQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByTitle(argument: _questionPackage_TitleQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByTitle(argument: _questionPackage_TitleQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByTitle(argument: _questionPackage_TitleQuery, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  
  FetchQuestionsByTitleAndCategory(argument: _questionPackage_TitleCategoryQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByTitleAndCategory(argument: _questionPackage_TitleCategoryQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByTitleAndCategory(argument: _questionPackage_TitleCategoryQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  FetchQuestionsByTitleAndCategory(argument: _questionPackage_TitleCategoryQuery, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByTitleAndCategory(argument: _questionPackage_TitleCategoryQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByTitleAndCategory(argument: _questionPackage_TitleCategoryQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByTitleAndCategory(argument: _questionPackage_TitleCategoryQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  fetchQuestionsByTitleAndCategory(argument: _questionPackage_TitleCategoryQuery, callback: grpc.requestCallback<_questionPackage_QueryResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface QueryServiceHandlers extends grpc.UntypedServiceImplementation {
  FetchQuestionsByCategory: grpc.handleUnaryCall<_questionPackage_CategoryQuery__Output, _questionPackage_QueryResponse>;
  
  FetchQuestionsByTitle: grpc.handleUnaryCall<_questionPackage_TitleQuery__Output, _questionPackage_QueryResponse>;
  
  FetchQuestionsByTitleAndCategory: grpc.handleUnaryCall<_questionPackage_TitleCategoryQuery__Output, _questionPackage_QueryResponse>;
  
}

export interface QueryServiceDefinition extends grpc.ServiceDefinition {
  FetchQuestionsByCategory: MethodDefinition<_questionPackage_CategoryQuery, _questionPackage_QueryResponse, _questionPackage_CategoryQuery__Output, _questionPackage_QueryResponse__Output>
  FetchQuestionsByTitle: MethodDefinition<_questionPackage_TitleQuery, _questionPackage_QueryResponse, _questionPackage_TitleQuery__Output, _questionPackage_QueryResponse__Output>
  FetchQuestionsByTitleAndCategory: MethodDefinition<_questionPackage_TitleCategoryQuery, _questionPackage_QueryResponse, _questionPackage_TitleCategoryQuery__Output, _questionPackage_QueryResponse__Output>
}
