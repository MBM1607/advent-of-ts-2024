export const upperCase = <T extends string>(x: T) => x.toUpperCase() as Uppercase<T>;
export const lowerCase = <T extends string>(x: T) => x.toLowerCase() as Lowercase<T>;
export const firstChar = <T extends string>(x: T) =>
	x[0] as T extends `${infer TFirst}${infer _}` ? TFirst : never;
export const firstItem = <T extends string[]>(x: T) => x[0] as T[0];
export const makeTuple = <T extends string>(x: T) => [x] as [T];
export const makeBox = <T>(value: T) => ({ value });

type TFunc<T1, T2> = (x: T1) => T2;

export const compose = <T1, T2, T3, T4>(f: TFunc<T1, T2>, g: TFunc<T2, T3>, h: TFunc<T3, T4>) => {
	return (x: T1) => {
		return h(g(f(x))) as T4;
	};
};
