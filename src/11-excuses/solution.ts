export type Excuse<T extends Record<string, string>> = {
	new (val: T): {
		[k in keyof T]: `${k & string}: ${T[k]}`;
	}[keyof T];
};
