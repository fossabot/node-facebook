import { load } from 'cheerio';

import { Info } from '../Facebook';
import { Form } from './Browser';

const QR_LOGIN = '#login_form input';


export const findForm = (body: string, head: string, tail: string): string => {
  const matches = new RegExp(`${head}(.*?)${tail}`).exec(body);
  if (matches) {
    return matches[1];
  }
  throw new Error(`Could not found match '${head}' -> '${tail}'`);
};

const formatCookie = (arr: string[], url: string): string => `${arr[0]}=${arr[1]}; Path=${arr[3]}; Domain=${url}`;

export default (body: string, user: Info) => {
  const $ = load(body);

  let form: Form = {};
  $(QR_LOGIN).each((index: number, elem: CheerioElement) => {
    const name = $(elem).attr('name');
    const val = $(elem).val();
    if (val && name) {
      (form[name] = val);
    }
  });
  const willBeCookies = body.split('"_js_');
  willBeCookies.shift();
  const cookies = willBeCookies.map((val: string): string => {
    const cookieData = JSON.parse(`["${findForm(val, '', ']')}]`);
    return formatCookie(cookieData, '.facebook.com');
  });

  form = Object.assign(form, {
    email: user.email,
    pass: user.pass,
    timezone: new Date().getTimezoneOffset(),
    lgndim: Buffer.from('{"w":1440,"h":900,"aw":1440,"ah":834,"c":24}').toString('base64'),
    lgnjs: Math.floor(Date.now() / 1000),
    default_persistent: '0',
  });
  return {
    form,
    cookies,
  };
};
