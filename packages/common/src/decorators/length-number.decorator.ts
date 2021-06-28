import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

type Constraints = [number];

export const LengthNumber =
	(length: number, validationOptions?: ValidationOptions): PropertyDecorator =>
	(object: unknown, propertyName: string) => {
		registerDecorator({
			name: 'lengthNumber',
			target: object.constructor,
			propertyName,
			constraints: [length] as Constraints,
			options: validationOptions,
			validator: {
				validate(value: number | undefined, args: ValidationArguments) {
					const [relatedPropertyValue] = args.constraints as Constraints;
					if (value === undefined) return false;
					const relatedValue = value.toString().length;
					return relatedPropertyValue === relatedValue;
				},

				defaultMessage(args: ValidationArguments) {
					const [relatedPropertyValue] = args.constraints;
					return `property must be longer than or equal to ${relatedPropertyValue}`;
				},
			},
		});
	};
