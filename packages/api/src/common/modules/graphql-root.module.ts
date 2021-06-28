import { GraphQLModule } from '@nestjs/graphql';

export const GraphQLRootModule = GraphQLModule.forRoot({
	autoSchemaFile: 'schema.gql',
});
