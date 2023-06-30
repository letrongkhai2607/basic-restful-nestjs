import { Transform } from 'class-transformer';

export function ToBoolean(): (target: any, key: string) => void {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return Transform(({ value, ...props }: any) => {
    return value === 'true' || value === true || value === 1 || value === '1';
  });
}

export function ToArray(): (target: any, key: string) => void {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return Transform(({ value, ...props }: any) => {
    if (!!value) {
      return value.split(',').map((str) => str.trim());
    }
    return undefined;
  });
}
