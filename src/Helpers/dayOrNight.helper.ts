import i18n from '@/I18n'

const dayOrNight = (date: Date) => {
  const hour = date.getHours();
  if (hour >= 3 && hour < 10) {
    return i18n.t('time.morning');
  }
  if (hour > 9 && hour < 16) {
    return i18n.t('time.afternoon');
  }
  if (hour >= 16 && hour < 19) {
    return i18n.t('time.evening');
  }
  if (hour >= 19 || hour < 3) {
    return i18n.t('time.night');
  }
}

export default dayOrNight