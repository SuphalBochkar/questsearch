import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { QueryServiceClient as _questionPackage_QueryServiceClient, QueryServiceDefinition as _questionPackage_QueryServiceDefinition } from './questionPackage/QueryService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  questionPackage: {
    Block: MessageTypeDefinition
    CategoryQuery: MessageTypeDefinition
    Option: MessageTypeDefinition
    QueryResponse: MessageTypeDefinition
    QueryService: SubtypeConstructor<typeof grpc.Client, _questionPackage_QueryServiceClient> & { service: _questionPackage_QueryServiceDefinition }
    QuestionItem: MessageTypeDefinition
    TitleCategoryQuery: MessageTypeDefinition
    TitleQuery: MessageTypeDefinition
  }
}

