export function classNames(...args: string[]) {
  return args.filter(Boolean).join(" ");
}

export const getNumber = (val: any): number | undefined => {
  if (!val) return;
  if (isNaN(val as unknown as number)) return;
  return val as unknown as number;
};
