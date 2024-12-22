type EscapeMap = { n: "\n"; r: "\r"; t: "\t"; b: "\b"; f: "\f" };
type Escapes = "\n" | "\r" | "\t" | "\b" | "\f";
type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
type TWhitespace = " " | Escapes;
type ParseKV<TK, TV> = TK extends string | number ? { [k in TK]: TV } : never;
type ParseObject<T extends string, TObject = {}> = T extends `${TWhitespace}${infer TRest}`
	? ParseObject<TRest, TObject>
	: T extends `${infer TK}: ${infer TRest}`
		? TRest extends `[${infer TArray extends string}],${infer TRestO}`
			? ParseObject<TRestO, Prettify<TObject & ParseKV<Parse<TK>, ParseArray<TArray>>>>
			: TRest extends `[${infer TArray extends string}]`
				? Prettify<TObject & ParseKV<Parse<TK>, ParseArray<TArray>>>
				: TRest extends `{${infer TObjectStr extends string}},${infer TRestO}`
					? ParseObject<TRestO, Prettify<TObject & ParseKV<Parse<TK>, ParseObject<TObjectStr>>>>
					: TRest extends `{${infer TObjectStr extends string}}`
						? Prettify<TObject & ParseKV<Parse<TK>, ParseObject<TObjectStr>>>
						: T extends `${infer TK}: ${infer TVal},${infer TRest}`
							? ParseObject<TRest, Prettify<TObject & ParseKV<Parse<TK>, Parse<TVal>>>>
							: T extends `${infer TK}: ${infer TVal}`
								? Prettify<TObject & ParseKV<Parse<TK>, Parse<TVal>>>
								: TObject
		: TObject;

type ParseArray<
	T extends string,
	TArray extends unknown[] = [],
> = T extends `${TWhitespace}${infer TRest}`
	? ParseArray<TRest, TArray>
	: T extends `[${infer TIArray extends string}],${infer TRestA}`
		? ParseArray<TRestA, [...TArray, ParseArray<TIArray>]>
		: T extends `[${infer TIArray extends string}]`
			? [...TArray, ParseArray<TIArray>]
			: T extends `{${infer TObjectStr extends string}},${infer TRestO}`
				? ParseArray<TRestO, [...TArray, ParseObject<TObjectStr>]>
				: T extends `{${infer TObjectStr extends string}}`
					? [...TArray, ParseObject<TObjectStr>]
					: T extends `${infer TFirst},${infer TRest}`
						? ParseArray<TRest, [...TArray, Parse<TFirst>]>
						: T extends ""
							? TArray
							: [...TArray, Parse<T>];

export type Parse<T extends string> = T extends `${TWhitespace}${infer TRest}`
	? Parse<TRest>
	: T extends `${infer TNum extends number}`
		? TNum
		: T extends `"${infer TStr extends string}"`
			? UnescapeStr<TStr>
			: T extends `${infer TB extends boolean}`
				? TB
				: T extends `${infer TNull extends null}`
					? TNull
					: T extends `[${infer TArray extends string}]`
						? ParseArray<TArray>
						: T extends `{${infer TObject extends string}}`
							? ParseObject<TObject>
							: T extends `${infer TRest}${TWhitespace | ","}`
								? Parse<TRest>
								: never;

type UnescapeStr<T extends string> = T extends `${infer before}\\${infer escape}${infer rest}`
	? escape extends keyof EscapeMap
		? `${before}${EscapeMap[escape]}${UnescapeStr<rest>}`
		: T
	: T;
