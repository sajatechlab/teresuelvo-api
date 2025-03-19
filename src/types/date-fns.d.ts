declare module 'date-fns' {
  export function startOfMonth(date: Date): Date
  export function subMonths(date: Date, amount: number): Date
  export function format(date: Date, formatStr: string): string
  export function parse(
    dateString: string,
    format: string,
    referenceDate?: Date
  ): Date
  export function isValid(date: any): boolean
  export function isDate(value: any): boolean
}
