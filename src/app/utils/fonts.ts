import { Kosugi_Maru, M_PLUS_1, M_PLUS_Rounded_1c } from 'next/font/google';

export const kosugiMaru = Kosugi_Maru({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const mplusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700', '800', '900'],
})