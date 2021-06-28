export interface IBaseFormProps<T extends Record<string, unknown>> {
	source: (data: T) => Promise<void>;
	buttonText: string;
	confirmQuestion: string;
	defaultValues?: Partial<T>;
}
