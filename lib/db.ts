// Wireframe mode: no database. `sql` is a stand-in that accepts the same
// calls as postgres.js and always resolves to an empty result set.

type Rows = Record<string, any>[] & { count: number };

function emptyResult(): Promise<Rows> & { simple: () => Promise<Rows> } {
  const rows = Object.assign([], { count: 0 }) as Rows;
  const p = Promise.resolve(rows) as Promise<Rows> & { simple: () => Promise<Rows> };
  p.simple = () => Promise.resolve(rows);
  return p;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sqlImpl(first: any, ...rest: any[]): any {
  if (Array.isArray(first) && "raw" in first) return emptyResult();
  void rest;
  return { __helper: true };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sql = sqlImpl as unknown as (<T = any[]>(strings: TemplateStringsArray, ...values: any[]) => Promise<T> & { simple: () => Promise<T> }) & ((...args: any[]) => any);

export function ensureSchema(): Promise<void> {
  return Promise.resolve();
}
