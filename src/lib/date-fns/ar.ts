import { arSA } from "date-fns/locale";

interface Localize {
  ordinalNumber: (...args: any[]) => any;
  era: (...args: any[]) => any;
  quarter: (...args: any[]) => any;
  month: (...args: any[]) => any;
  day: (...args: any[]) => any;
  dayPeriod: (...args: any[]) => any;
}

const months = [
    'كانون الثاني',
    'شباط',
    'آذار',
    'نيسان',
    'أيار',
    'حزيران',
    'تموز',
    'آب',
    'أيلول',
    'تشرين الأول',
    'تشرين الثاني',
    'كانون الأول'
  ]

const ar: Locale = {
  ...arSA,
  code: "ar",
  localize: {
    ...(arSA.localize as Localize),
    month: (month) => months[month],
  },
};

export default ar;
