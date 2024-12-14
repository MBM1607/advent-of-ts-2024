export type PerfReview<T> = T extends AsyncGenerator<infer TYield, void, unknown> ? TYield : never;
