import type { Locale } from 'date-fns'
import enUS from 'date-fns/locale/en-US/index.js'
import { defu } from 'defu'
import { get as getCookie, set as setCookie } from 'es-cookie'

import LocaleData, { HLanguage } from './locales'

interface DateFNSLocale {
  /**
   * @default 'locale'
   */
  storageKey?: string
  /**
   * @default 'en-US'
   */
  locale: string
  nuxt?: boolean
}
let dateLocale: Locale = enUS

export async function loadDateFNSLocale(lang: DateFNSLocale): Promise<Locale> {
  const options = defu(lang, {
    locale: 'en-US',
    storageKey: 'locale',
    nuxt: false
  } as DateFNSLocale)

  if (options.storageKey && !options.nuxt) {
    const cookie = getCookie(options.storageKey)
    console.log('loadDateFNSLocale', cookie)

    if (!cookie) {
      setCookie(options.storageKey, options.locale)
    } else {
      const data = await setDateLocale(cookie as any)
      return data || enUS
    }
  } else {
    await setDateLocale(options.locale as any)
    return dateLocale
  }
  return enUS
}

async function setDateLocale(locale: HLanguage) {
  const data = LocaleData[locale]
  console.log('setDateLocale', data)
  if (data) {
    const getd = data.getStrings()
    console.log(getd, 'getd')
    const mod = await getd.fnDate
    console.log('setDateLocale', mod)
    if (mod) {
      console.log('ttt', mod.default)
      dateLocale = mod.default
    } else {
      return enUS
    }
  } else {
    console.log('setDateLocale', 'enUS')
  }
}
