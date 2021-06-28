import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export const IsEqualTo =
	(property: string, validationOptions?: ValidationOptions): PropertyDecorator =>
	(object: unknown, propertyName: string) => {
		registerDecorator({
			name: 'isEqualTo',
			target: object.constructor,
			propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: unknown, args: ValidationArguments) {
					const [relatedPropertyName] = args.constraints;
					const relatedValue = (args.object as unknown)[relatedPropertyName];
					return value === relatedValue;
				},

				defaultMessage(args: ValidationArguments) {
					const [relatedPropertyName] = args.constraints;
					return `Поле должно точно соответствовать ${relatedPropertyName}`;
				},
			},
		});
	};
