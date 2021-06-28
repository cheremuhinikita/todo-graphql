import * as bcrypt from 'bcrypt';

const saltOrRounds = 2;

export const generateHash = async (data: string): Promise<string> => {
	const salt = await bcrypt.genSalt(saltOrRounds);
	return await bcrypt.hash(data, salt);
};

export const compareHash = async (data: string, encrypted: string): Promise<boolean> =>
	bcrypt.compare(data, encrypted);

export const generateRandomCode = (length: number): number =>
	Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
