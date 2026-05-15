export const STANDARD_SIZES: Record<string, Record<string, number>> = {
  S: { chest: 88, waist: 74, hips: 94, shoulder: 40, arm: 58, inseam: 76, neck: 37, back_width: 34, bicep: 28, wrist: 15 },
  M: { chest: 94, waist: 80, hips: 100, shoulder: 42, arm: 60, inseam: 78, neck: 39, back_width: 36, bicep: 30, wrist: 16 },
  L: { chest: 100, waist: 86, hips: 106, shoulder: 44, arm: 62, inseam: 80, neck: 41, back_width: 38, bicep: 32, wrist: 17 },
  XL: { chest: 106, waist: 92, hips: 112, shoulder: 46, arm: 63, inseam: 82, neck: 43, back_width: 40, bicep: 34, wrist: 18 },
  '2XL': { chest: 112, waist: 98, hips: 118, shoulder: 48, arm: 64, inseam: 83, neck: 45, back_width: 42, bicep: 36, wrist: 19 },
  '3XL': { chest: 118, waist: 104, hips: 124, shoulder: 50, arm: 65, inseam: 84, neck: 47, back_width: 44, bicep: 38, wrist: 20 },
  '4XL': { chest: 124, waist: 110, hips: 130, shoulder: 52, arm: 66, inseam: 85, neck: 49, back_width: 46, bicep: 40, wrist: 21 },
};

export const SIZE_LABELS = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'] as const;

export const MEASUREMENT_LABELS: Record<string, string> = {
  chest: 'الصدر',
  waist: 'الخصر',
  hips: 'الوركين',
  shoulder: 'عرض الكتف',
  arm: 'طول الذراع',
  inseam: 'درزة داخلية',
  neck: 'الرقبة',
  back_width: 'عرض الظهر',
  bicep: 'العضد',
  wrist: 'الرسغ',
};
