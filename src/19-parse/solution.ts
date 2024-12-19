type ParseStatement<T extends string> =
	T extends `${string}${"let" | "const" | "var"} ${infer TId extends string} =${string}`
		? [
				{
					id: TId;
					type: "VariableDeclaration";
				},
			]
		: T extends `${string}(${infer TArg extends string})${string}`
			? [
					{
						argument: TArg;
						type: "CallExpression";
					},
				]
			: [];

export type Parse<
	T extends string,
	TResult extends unknown[] = [],
> = T extends `${infer TFirst};${infer TSecond}`
	? Parse<TSecond, [...TResult, ...ParseStatement<TFirst>]>
	: [...TResult, ...ParseStatement<T>];
