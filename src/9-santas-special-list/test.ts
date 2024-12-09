import type { Child, List, Status } from "santas-special-list";
import type { Equal, Expect } from "type-testing";

type t0_actual = Status; // =>
type t0_expected = "naughty" | "nice"; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = Child; // =>
type t1_expected = {
	// =>
	name: string;
	status: Status;
};
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = List; // =>
type t2_expected = Child[]; // =>
type t2 = Expect<Equal<t2_actual, t2_expected>>;
