export type FormatNames<TNames extends readonly [string, string, string][]> = {
	[Key in keyof TNames]: {
		name: TNames[Key][0];
		count: TNames[Key][2] extends `${infer Count extends number}` ? Count : never;
		rating: TNames[Key][0] extends "Aagya" | "Petra" | "Yanni" ? "nice" : "naughty";
	};
};
