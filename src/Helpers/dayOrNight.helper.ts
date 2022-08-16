import i18n from '@/I18n'

const dayOrNight = (date: Date) => {
  const hour = date.getHours();
  if (hour < 3) {
    return i18n.t('time.night');
  } else if (hour < 10) {
    return i18n.t('time.morning');
  } else if (hour < 18) {
    return i18n.t('time.afternoon');
  } else {
    return i18n.t('time.evening');
  }
}

export default dayOrNight