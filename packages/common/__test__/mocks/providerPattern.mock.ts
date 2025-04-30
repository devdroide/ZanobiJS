export const dataMock = {
  id: 12345678,
  user: 'DEVDROIDE',
  name: 'devroide devdroide',
  intro: {
    roles: ['admin', 'cajero', 'asesor'],
    cities: JSON.stringify(['Madrid', 'Roma', 'Buenos Aires']),
    listEmail: [
      'devdroide@gmail.com',
      'devdroide@example.com',
      'devdroide@outlook.com',
    ],
    introObj: JSON.stringify({
      typeId: 'Modal',
      message: 'Un mensaje del sistema',
    }),
    introData: JSON.stringify({
      list: [
        'Cali',
        {
          type: 'Modal',
          field: JSON.stringify({
            introField: 'QWE_1334343_RTY_5454455 ASDFF-643445',
          }),
        },
        [
          'devdroide@gmail.com',
          'texto en lista',
          'mi texto',
          JSON.stringify({ id: '98765544' }),
        ],
      ],
      email: 'devdroide@gmail.com',
    }),
  },
  falseJson: '{ some text }',
};

export const dataToDefaultMock = {
  authorizationBearer: 'Bearer Add13423232323232',
  authorizationBasic: 'Basic Add13423232323232',
  email: 'devdroide@gmail.com',
  creditCards:
    'My card is 4111 1111 1111 1234 and another is 5500-0000-0000-5678.',
};

export const schemaMock = {
  requestSchema: {
    id: ['LastFour'],
    user: ['AllText'],
    intro: ['FirstFour'],
    introField: ['OnlyText'],
    cities: ['AllText'],
    listEmail: ['FirstFour'],
    list: ['LastFour'],
  },
};
