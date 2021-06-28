module.exports = {
	schema: [
		{
			[`${process.env.REACT_APP_API_URL}/graphql`]: {},
		},
	],
	overwrite: true,
	documents: ['./src/**/*.graphql'],
	config: {
		scalars: {
			Date: 'string',
		},
		enumValues: {
			Role: './core/enums#Role',
		},
	},
	generates: {
		'./src/gql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				withHOC: false,
				withHooks: false,
				withComponent: false,
				skipTypename: false,
				withResultType: true,
				withMutationFn: true,
				apolloReactHooksImportFrom: '@apollo/client',
			},
		},
	},
};
