export type GetRoute<
	T extends string,
	TDashes extends string[] = [],
	TRoute extends [string, number][] = [],
	TWord extends string = "",
> = T extends `${infer F}${infer R}`
	? F extends "-"
		? GetRoute<
				R,
				TRoute extends []
					? TWord extends ""
						? []
						: ["-"]
					: TWord extends ""
						? [F, ...TDashes]
						: ["-"],
				TWord extends "" ? TRoute : [...TRoute, [TWord, TDashes["length"]]],
				""
			>
		: GetRoute<R, TDashes, TRoute, `${TWord}${F}`>
	: TWord extends ""
		? TRoute
		: [...TRoute, [TWord, TDashes["length"]]];
