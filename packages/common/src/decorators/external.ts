import {
	IsEmail as IsEmailClassValidator,
	IsEnum as IsEnumClassValidator,
	IsNotEmpty as IsNotEmptyClassValidator,
	IsString as IsStringClassValidator,
	Length as LengthClassValidator,
	IsNumber as IsNumberClassValidator,
	IsInt as IsIntClassValidator,
} from 'class-validator';

export const IsEmail = (): PropertyDecorator =>
	IsEmailClassValidator({}, { message: 'Некорректный e-mail' });

export const IsEnum = (entity: Record<string, unknown>): PropertyDecorator =>
	IsEnumClassValidator(entity, { message: 'Некорректное значение из списка' });

export const IsNotEmpty = (): PropertyDecorator =>
	IsNotEmptyClassValidator({ message: 'Это обязательное поле' });

export const IsString = (): PropertyDecorator =>
	IsStringClassValidator({ message: 'Это поле является строкой' });

export const Length = (min: number, max: number): PropertyDecorator =>
	LengthClassValidator(min, max, {
		message: `Это поле должно содержать от ${min} до ${max} символов`,
	});

export const IsNumber = (): PropertyDecorator =>
	IsNumberClassValidator(
		{},
		{
			message: `Это поле является числом`,
		},
	);

export const IsInt = (): PropertyDecorator =>
	IsIntClassValidator({
		message: `Это поле является целым числом`,
	});
