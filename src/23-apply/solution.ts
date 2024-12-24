declare const cap: unique symbol;
export type Cap = typeof cap;

declare const push: unique symbol;
export type Push = typeof push;

declare const pushCurried: unique symbol;
export type PushCurried<U = unset> = typeof pushCurried & {
	arg: U;
};

declare const unset: unique symbol;
export type unset = typeof unset;

declare const applyAll: unique symbol;
export type ApplyAll<U = unset> = typeof applyAll & {
	arg: U;
};

declare const _extends: unique symbol;
export type Extends<U = unset> = typeof _extends & {
	arg: U;
};

declare const _filter: unique symbol;
export type Filter<U = unset> = typeof _filter & {
	arg: U;
};

export type CapAll<T> = T extends [infer first, ...infer rest]
	? [first extends string ? Capitalize<first> : first, ...CapAll<rest>]
	: [];

export type _Filter<T, U> = T extends [infer first, ...infer rest]
	? U extends Extends<infer V>
		? first extends V
			? [first, ..._Filter<rest, U>]
			: _Filter<rest, U>
		: _Filter<rest, U>
	: [];

export type Apply<T, U> = [T, U] extends [Cap, string]
	? Capitalize<U & string>
	: [T, U] extends [Push, unknown]
		? PushCurried<U>
		: T extends PushCurried<infer a>
			? U extends unknown[]
				? [...U, a]
				: never
			: T extends ApplyAll<unset>
				? ApplyAll<U>
				: T extends ApplyAll<Cap>
					? CapAll<U>
					: T extends Extends<unset>
						? Extends<U>
						: T extends Filter<unset>
							? Filter<U>
							: T extends Filter<infer V>
								? _Filter<U, V>
								: never;
