import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
	description = 'Date custom scalar type';

	parseValue(value: string): Date {
		return new Date(value);
	}

	serialize(value: string | Date): string {
		return new Date(value).toString();
	}

	parseLiteral(ast: ValueNode): Date {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value);
		}
		return null;
	}
}
