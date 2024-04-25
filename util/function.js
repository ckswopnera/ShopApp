import { emoji } from './emoji';
import * as Yup from 'yup';
import { Dimensions, Text, View, useWindowDimensions } from 'react-native';
import Config from 'react-native-config';
import { emailregExp } from './validate_regex';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

export const requiredSchema = Yup.string().required('*required');

export const yup_password_validation = Yup
  .string()
  .concat(requiredSchema)
  .test(
    'isValidPass',
    'Password must have: \n\nOne UpperCase\nOne LowerCase\nOne Number\nMin 6 characters',
    (value, context) => {
      const hasUpperCase = /[A-Z]/.test(value)
      const hasNumber = /[0-9]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasMinChar = /.{6,}/.test(value);

      const conditionsMet = {
        uppercase: hasUpperCase,
        lowercase: hasLowerCase,
        number: hasNumber,
        chararacter: hasMinChar,
      };

      const failedChecks = [];
      const successChecks = []

      for (const condition in conditionsMet) {
        if (!conditionsMet[condition]) {
          failedChecks.push(condition);
        }
        else successChecks.push(condition);

      }
      if (failedChecks.length > 0) {
        return context.createError({
          message: <><Text style={{ color: '#fff', textTransform: 'capitalize',}}>Password must contain: {failedChecks.map((check, index) =>
            <Text key={index} style={{
            }}>
              {index >= 0 && check !== 'chararacter' && '\nOne '}
              {check === 'chararacter' ? '\nmin 6 characters' : check} <Text style={{ color: 'red' }}>{String.fromCharCode(parseInt(emoji.cross_emoji.substring(2), 10))}</Text>
            </Text>
          )}</Text>
            <Text style={{ color: 'rgba(147,250,165,1)', textTransform: 'capitalize' }}> {successChecks.map((check, index) =>
              <Text key={index} style={{
                // textDecorationLine: 'line-through',
              }}>
                {index >= 0 && check !== 'chararacter' && '\nOne '}
                {check === 'chararacter' ? '\nmin 6 characters' : check} <Text>{String.fromCharCode(parseInt(emoji.tick_emoji.substring(2), 10))}</Text>
              </Text>

            )}</Text></>
        });
      }
      // console.log(context.errorMessage);

      return failedChecks.length === 0  
    },
  );

export const yup_mail_validation = Yup.string().matches(emailregExp, '*invalid email')


