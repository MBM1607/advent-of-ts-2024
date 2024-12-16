type RemoveFromTuple<Tuple extends any[], SubTuple extends any[]> = Tuple extends [
	...SubTuple,
	...infer TRest,
]
	? TRest
	: never;

type TCurriedFun<TArgs extends any[], TReturn> = <TCurrentArgs extends any[]>(
	...args: TCurrentArgs
) => RemoveFromTuple<TArgs, TCurrentArgs>["length"] extends 0
	? TReturn
	: TCurriedFun<RemoveFromTuple<TArgs, TCurrentArgs>, TReturn>;

export declare function DynamicParamsCurrying<TArgs extends any[], TReturn>(
	fun: (...arg: TArgs) => TReturn,
): TCurriedFun<TArgs, TReturn>;
