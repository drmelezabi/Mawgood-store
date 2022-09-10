import { parseTypes } from '../../interface/parsing';

export const parse = (err: NodeJS.ErrnoException) => {
  const errorCodes: parseTypes = {
    '08003': 'connection does not exist',
    '08006': 'connection failure',
    '22P02': 'invalid input',
    '42601': 'syntax error',
    '42501': 'insufficient privilege',
    '42602': 'invalid name',
    '42622': 'name too long',
    '42939': 'reserved name',
    '42703': 'undefined column',
    '42000': 'syntax error or access rule violation',
    '42P01': 'undefined table',
    '2F002': 'modifying sql data not permitted',
    '57P03': 'cannot connect now',
    '42P02': 'undefined parameter',
  };

  if (err !== undefined) {
    if (err.message !== undefined) {
      console.error('ERROR:', err.message);
    }

    if (err.code !== undefined) {
      console.error('ERROR code:', err.code);

      if (errorCodes[err.code] !== undefined) {
        console.error('ERROR description:', errorCodes[err.code]);
        return errorCodes[err.code];
      }
    }

    if (err.code === undefined) {
      console.error('Unknown error:', err);
    }
  }
};
