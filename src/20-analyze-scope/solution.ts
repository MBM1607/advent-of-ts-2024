type TRes = {
	declared: string[];
	used: string[];
};

type ParseStatement<T extends string, TResult extends TRes> = T extends `${string}${
	| "let"
	| "const"
	| "var"} ${infer TId extends string} =${string}`
	? {
			declared: [...TResult["declared"], TId];
			used: TResult["used"];
		}
	: T extends `${string}(${infer TId extends string})${string}`
		? {
				used: [...TResult["used"], TId];
				declared: TResult["declared"];
			}
		: TResult;

export type AnalyzeScope<
	T extends string,
	TResult extends TRes = {
		declared: [];
		used: [];
	},
> = T extends `${infer TFirst};${infer TSecond}`
	? AnalyzeScope<TSecond, ParseStatement<TFirst, TResult>>
	: ParseStatement<T, TResult>;
