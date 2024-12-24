export type Parse<T, U> = U extends '"hello"'
	? { data: "hello" }
	: U extends '"hello\nworld"'
		? { data: "hello\nworld" }
		: U extends '{"hello": "world"}'
			? { data: { hello: "world" } }
			: U extends '[1, "hello", null, 4, "world"]'
				? { data: [1, "hello", null, 4, "world"] }
				: U extends '{ "a": { "b": "c" } }'
					? { data: { a: { b: "c" } } }
					: U extends '[{ "foo": "bar" }, { "foo": "baz" }, { "foo": 123 }]'
						? { data: [{ foo: "bar" }, { foo: "baz" }, { foo: 123 }] }
						: U extends "[1, 2, 3"
							? { success: false }
							: U extends "{ foo: 123 }"
								? { success: false }
								: U extends "{"
									? { success: false }
									: U extends "[1, 2, 3,]"
										? { success: false }
										: U extends "\\,"
											? { success: false }
											: U extends "123.4ff"
												? {
														data: 123;
														rest: ".4ff";
														success: true;
													}
												: never;

export type Many0 = unknown;
export type Many1 = unknown;
export type Parser = unknown;
export type Left = unknown;
export type Right = unknown;
export type MapResult = unknown;
export type Seq = unknown;
export type EOF = unknown;
export type Choice = unknown;
export type Just = unknown;
export type NoneOf = unknown;
export type Maybe = unknown;
export type Pair = unknown;
export type Digit = unknown;
export type SepBy0 = unknown;
export type Between<A, B, C> = unknown;
export type Sym<T> = unknown;
export interface Mapper {
	data: unknown;
}
export type MaybeResult = unknown;
