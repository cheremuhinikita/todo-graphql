export const stringifyObject = (item: unknown): string =>
	JSON.stringify(item).replace(/\"([^(\")"]+)\":/g, '$1:');

export const stringifyEnumValue = (str: string, enumValue: string | number): string =>
	str.replace(`"${enumValue.toString()}"`, enumValue.toString());

export const createUniqueColumn = (column: string | number): string =>
	`${column.toString()}${Date.now().toLocaleString()}`;
