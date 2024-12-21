type TRemove<T extends unknown[], U> = T extends [infer first, ...infer rest]
	? first extends U
		? rest
		: [first, ...TRemove<rest, U>]
	: [];

type TRes = {
	scope: {
		declared: string[];
		used: string[];
	};
	unused: string[];
};

type ParseStatement<T extends string, TResult extends TRes> = T extends `${string}${
	| "let"
	| "const"
	| "var"} ${infer TId extends string} =${string}`
	? {
			scope: {
				declared: [...TResult["scope"]["declared"], TId];
				used: TResult["scope"]["used"];
			};
			unused: [...TResult["unused"], TId];
		}
	: T extends `${string}(${infer TId extends string})${string}`
		? {
				scope: {
					used: [...TResult["scope"]["used"], TId];
					declared: TResult["scope"]["declared"];
				};
				unused: TRemove<TResult["unused"], TId>;
			}
		: TResult;

export type Lint<
	T extends string,
	TResult extends TRes = {
		scope: {
			declared: [];
			used: [];
		};
		unused: [];
	},
> = T extends `${infer TFirst};${infer TSecond}`
	? Lint<TSecond, ParseStatement<TFirst, TResult>>
	: ParseStatement<T, TResult>;
