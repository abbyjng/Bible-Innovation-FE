export function classNames(...args: string[]) {
  return args.filter(Boolean).join(" ");
}

export const getNumber = (val: any): number | undefined => {
  if (!val) return;
  if (isNaN(val as unknown as number)) return;
  return val as unknown as number;
};

export const isNextDay = (time: number): number => {
  const now = new Date();
  const lastIncrement = new Date(time);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (
    yesterday.getDate() === lastIncrement.getDate() &&
    yesterday.getMonth() === lastIncrement.getMonth() &&
    yesterday.getFullYear() === lastIncrement.getFullYear()
  ) {
    return 1;
  } else if (now.getTime() - lastIncrement.getTime() > 1000 * 60 * 60 * 48) {
    return 0;
  } else {
    return 2;
  }
};
