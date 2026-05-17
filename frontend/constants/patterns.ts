export const PATTERN_MODELS = [
  { id: 'shirt', name: 'Classic Shirt', nameAr: 'قميص كلاسيك', category: 'simple', icon: 'shirt-outline' },
  { id: 'abaya', name: 'Abaya', nameAr: 'عباية', category: 'simple', icon: 'accessibility-outline' },
  { id: 'kaftan', name: 'Kaftan', nameAr: 'قفطان', category: 'simple', icon: 'accessibility-outline' },
  { id: 'djellaba', name: 'Djellaba', nameAr: 'جلابة', category: 'simple', icon: 'accessibility-outline' },
  { id: 'takchita', name: 'Takchita', nameAr: 'تکشيطة', category: 'simple', icon: 'accessibility-outline' },
  { id: 'jabadour', name: 'Jabadour', nameAr: 'جبدور', category: 'simple', icon: 'accessibility-outline' },
  { id: 'blouse', name: 'Blouse', nameAr: 'بلوزة', category: 'simple', icon: 'shirt-outline' },
  { id: 'skirt', name: 'Skirt', nameAr: 'تنورة', category: 'simple', icon: 'cut-outline' },
  { id: 'trousers', name: 'Trousers', nameAr: 'بنطلون', category: 'simple', icon: 'footsteps-outline' },
  { id: 'blazer', name: 'Blazer', nameAr: 'بليزر', category: 'simple', icon: 'shirt-outline' },
];

export const PROFESSIONAL_PARAMS = [
  { key: 'neckline', label: 'خط العنق', options: ['V-Neck', 'Round', 'Square', 'Sweetheart', 'Off-shoulder'] },
  { key: 'sleeve', label: 'نوع الكم', options: ['Long', 'Short', '3/4', 'Puff', 'None'] },
  { key: 'length', label: 'الطول', options: ['Mini', 'Knee', 'Midi', 'Maxi', 'Floor'] },
  { key: 'fit', label: 'القصة', options: ['Fitted', 'Semi-fitted', 'Loose', 'Oversized', 'A-Line'] },
  { key: 'collar', label: 'الياقة', options: ['No collar', 'Mandarin', 'Peter Pan', 'Lapel', 'Turtle'] },
  { key: 'waist', label: 'خط الخصر', options: ['Natural', 'Empire', 'Low', 'Dropped', 'No waist'] },
];

export const MEASUREMENT_LABELS: Record<string, string> = {
  height: 'الطول',
  chest: 'الصدر',
  waist: 'الخصر',
  hips: 'الوركين',
  shoulder_width: 'عرض الكتف',
  arm_length: 'طول الذراع',
  inseam: 'درزة داخلية',
  neck: 'الرقبة',
  back_width: 'عرض الظهر',
  bicep: 'العضد',
  wrist: 'الرسغ',
  shirt_length: 'طول القميص',
};
