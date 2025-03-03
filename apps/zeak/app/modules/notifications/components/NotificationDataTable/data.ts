/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from "@faker-js/faker";

export type TData = {
  id: string;

  notificationName:string,
  triggerState:string,
  email: string;
  role: string;
  status: boolean;
  companies: string[];
  notification_seen: boolean;
  deliveryMethod: {
    inApp: boolean,
    email: boolean,
    sms: boolean,
  },
  login: boolean;
  reoccurring: boolean;
  creationDate:string,
  lastRunDate:string,
  last_login: string;
  triggerType:string,
  cost?:number,
  recipients:string[],
  chartData: number[];
  subRows?: TData[];
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newData = (): TData => {
  const arrayLength = faker.number.int({ min: 1, max: 4 });
  const chartLength = faker.number.int(20);
  return {
    id: faker.string.uuid(),

    notificationName: faker.lorem.words(faker.number.int({ min: 1, max: 3 })),
    triggerState: faker.helpers.arrayElement(["running",  "waiting", "completed"]),
    email: faker.internet.email(),
    reoccurring: faker.datatype.boolean(),
    creationDate: faker.date.past().toISOString(),
    lastRunDate: faker.date.recent().toISOString(),
    triggerType: faker.helpers.arrayElement(["On-Demand", "Time-Based", "Event-Based"]),
    cost: faker.helpers.arrayElement([undefined, faker.number.int({ min: 100, max: 10000 })]),
    deliveryMethod: {
      inApp: faker.datatype.boolean(),
      email: faker.datatype.boolean(),
      sms: faker.datatype.boolean(),
    },
    recipients: Array.from({ length:faker.number.int({ min: 4, max: 10 }) }, () => faker.company.name()),
    role: faker.helpers.arrayElement([
      "Admin",
      "User",
      "Developer",
      "Content Creator",
      "Manager",
      "UX Designer",
    ]),
    status: faker.datatype.boolean(),
    companies: Array.from({ length: arrayLength }, () => faker.company.name()),
    notification_seen: faker.datatype.boolean(),
    login: faker.datatype.boolean(),
    chartData: Array.from({ length: chartLength }, () => faker.number.int({ min: 1, max: 200 })),
    last_login: faker.date.past().toISOString(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): TData[] => {
    const len = lens[depth]!;
    return range(len).map((d): TData => {
      return {
        ...newData(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export type TDataRaw = Partial<TData>

export const rawData:TDataRaw[]=[
  {
    "id": "1c1c733b-c668-4a62-b114-c41bae7a86f4",
    "notificationName": "adipisci alveus",
    "triggerState": "completed",
    "email": "Berneice_Morissette@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-02-14T03:37:17.207Z",
    "lastRunDate": "2025-01-14T07:10:19.781Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Tillman, Buckridge and Yost",
      "Mosciski LLC",
      "Brakus, Kuphal and Nitzsche",
      "Sawayn - Haag",
      "Stroman LLC",
      "VonRueden Inc",
      "Daugherty, Ferry and Marvin"
    ],
    "role": "Admin",
    "status": false,
    "companies": [
      "Langosh - Mitchell",
      "Wisozk, Thompson and Olson"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      196,
      144,
      98,
      84,
      109,
      187,
      151,
      154,
      126,
      79,
      143
    ],
    "last_login": "2024-11-28T03:16:16.281Z"
  },
  {
    "id": "7f60871a-7c78-4302-a3c7-688db0939242",
    "notificationName": "veritatis sublime casus",
    "triggerState": "waiting",
    "email": "Bret_Herzog55@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-06-12T20:19:14.921Z",
    "lastRunDate": "2025-01-14T16:23:04.791Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "DuBuque, Thompson and Rutherford",
      "Langworth Group",
      "Pacocha and Sons",
      "Powlowski and Sons",
      "Bernier Inc",
      "Schaefer - Bahringer"
    ],
    "role": "UX Designer",
    "status": true,
    "companies": [
      "Schumm - Hamill"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      138
    ],
    "last_login": "2024-02-19T15:45:37.354Z"
  },
  {
    "id": "1dfcf470-4f71-4dab-9dc3-93265277be91",
    "notificationName": "bardus conqueror temeritas",
    "triggerState": "completed",
    "email": "Maryse15@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-12-27T11:19:44.781Z",
    "lastRunDate": "2025-01-14T20:07:50.203Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Welch Inc",
      "Abbott, Lubowitz and Streich",
      "Hoeger - Collier",
      "Borer - Emmerich",
      "Hackett - Moen",
      "Koelpin Inc",
      "Kertzmann and Sons"
    ],
    "role": "Manager",
    "status": false,
    "companies": [
      "Gulgowski, VonRueden and Konopelski",
      "Lehner - Dickinson",
      "Considine - Grant"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      129,
      101,
      20,
      84,
      163,
      135,
      23,
      168,
      23,
      166,
      3,
      112,
      173,
      152,
      159,
      188,
      70
    ],
    "last_login": "2024-07-04T17:05:40.022Z"
  },
  {
    "id": "0517ddef-3154-4af0-8b08-9bb59d2c3d12",
    "notificationName": "casus",
    "triggerState": "running",
    "email": "Kasandra_Kiehn@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-05-09T06:38:12.068Z",
    "lastRunDate": "2025-01-14T09:52:23.134Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Schinner - Russel",
      "Corkery Inc",
      "Robel - Quitzon",
      "Bartell, Batz and Collins",
      "Cole Group",
      "Kreiger and Sons",
      "Wiegand, Towne and Harber"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Gibson - Dicki",
      "Halvorson - Kautzer"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      95
    ],
    "last_login": "2024-03-27T15:29:06.670Z"
  },
  {
    "id": "ad7f318f-9a0e-4aef-b759-b3ad37976546",
    "notificationName": "vigilo corrupti explicabo",
    "triggerState": "completed",
    "email": "Giovanny51@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-12-24T13:00:28.348Z",
    "lastRunDate": "2025-01-14T23:13:53.308Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Schowalter and Sons",
      "Pagac Inc",
      "Dach - Kautzer",
      "Kerluke, Boyer and Parker",
      "Lesch, Goyette and Kunde",
      "Stiedemann and Sons",
      "Turner - Mraz",
      "Farrell, O'Reilly and Hettinger",
      "Bashirian LLC",
      "Cummerata, Hagenes and Hickle"
    ],
    "role": "Developer",
    "status": false,
    "companies": [
      "Walsh LLC"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      32,
      106,
      28,
      147,
      12,
      152,
      49,
      141,
      194,
      35,
      148,
      29,
      90,
      174,
      99,
      152,
      36,
      28,
      181
    ],
    "last_login": "2024-11-12T03:26:47.628Z"
  },
  {
    "id": "457826ad-4270-4b33-9442-44fe16e5615a",
    "notificationName": "defaeco",
    "triggerState": "running",
    "email": "Oran.Grady@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-04-17T22:28:36.076Z",
    "lastRunDate": "2025-01-14T19:12:49.464Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Gutmann, McDermott and Stehr",
      "Glover - Von",
      "Jerde and Sons",
      "Kunde and Sons",
      "Botsford, Zboncak and Goodwin",
      "Langosh Group",
      "Trantow LLC",
      "Watsica, Davis and Effertz"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Turner, Jakubowski and Stoltenberg",
      "Ziemann, O'Connell and Pollich",
      "Lehner, Daniel and Mitchell",
      "Bahringer LLC"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      22
    ],
    "last_login": "2024-11-06T03:48:22.116Z"
  },
  {
    "id": "839c12f4-2def-4392-a979-f72fd1a0e0e6",
    "notificationName": "carmen spero",
    "triggerState": "waiting",
    "email": "Christina10@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-02-25T15:31:06.955Z",
    "lastRunDate": "2025-01-14T15:59:35.956Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Hilpert Inc",
      "Boyer and Sons",
      "Deckow LLC",
      "Watsica Inc",
      "Shanahan Inc",
      "Reynolds - Abshire",
      "Maggio - Rempel",
      "Friesen Inc",
      "Rau - O'Reilly"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Pacocha and Sons",
      "Gottlieb Group",
      "Effertz - Fisher"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      52,
      187,
      177,
      86,
      46
    ],
    "last_login": "2024-05-03T13:20:55.689Z"
  },
  {
    "id": "c57f15a1-c6bd-4d2e-8101-bc2e3c75a8a0",
    "notificationName": "avaritia apparatus",
    "triggerState": "waiting",
    "email": "Krista_Wilkinson33@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-08-01T03:24:10.673Z",
    "lastRunDate": "2025-01-14T14:26:08.441Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Windler and Sons",
      "Hilll - O'Conner",
      "Emmerich and Sons",
      "Hills, Stehr and Mante",
      "Bruen, Adams and Donnelly",
      "Fritsch, Jacobs and Greenholt",
      "Sauer - Kub"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Skiles and Sons",
      "Nader, Considine and Von",
      "Vandervort, Trantow and Gerhold",
      "Spencer - Walsh"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      69,
      104,
      66,
      197,
      48,
      51,
      130,
      45,
      49,
      144,
      70,
      16,
      76,
      98,
      17,
      133,
      178,
      34
    ],
    "last_login": "2024-07-13T07:38:45.391Z"
  },
  {
    "id": "907c9c69-887c-470e-be75-e05f69ab97e7",
    "notificationName": "maiores pauci cuius",
    "triggerState": "running",
    "email": "Alphonso49@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-11-30T11:38:39.918Z",
    "lastRunDate": "2025-01-15T02:01:33.657Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Lockman, Lockman and Rutherford",
      "Hirthe Inc",
      "Buckridge - Schroeder",
      "Hansen - Murphy",
      "Kautzer LLC",
      "Bogan - Bayer",
      "Kub - Waelchi",
      "Feeney, Morar and Emard",
      "Koepp and Sons"
    ],
    "role": "Admin",
    "status": false,
    "companies": [
      "Walker - Muller",
      "Hudson, Oberbrunner and Ortiz"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      21,
      38,
      44,
      54,
      31,
      8,
      186,
      145,
      160,
      37,
      73,
      60,
      122,
      77,
      172,
      24
    ],
    "last_login": "2024-07-03T12:13:14.000Z"
  },
  {
    "id": "cba87910-2443-44a3-ad19-97803e6bcc22",
    "notificationName": "virtus",
    "triggerState": "waiting",
    "email": "Beau45@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-03-29T23:24:17.276Z",
    "lastRunDate": "2025-01-14T18:38:46.037Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Ernser - Purdy",
      "Kirlin and Sons",
      "Fay - Rohan",
      "Jenkins - Bode",
      "Reichel, Murazik and Wolf",
      "Fahey - Barrows",
      "Aufderhar, Mosciski and Dicki",
      "Lehner, McKenzie and Hirthe",
      "Halvorson LLC"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Connelly - Blick",
      "Boyer, Daniel and Beier",
      "Koss - Rodriguez",
      "Kunde Group"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      150,
      80,
      18,
      37,
      69,
      75,
      50,
      160,
      78,
      198
    ],
    "last_login": "2024-07-10T03:20:00.958Z"
  },
  {
    "id": "fb6e103f-fb67-4379-b978-6ba356f13fb6",
    "notificationName": "culpo accusamus",
    "triggerState": "waiting",
    "email": "Willis.Kozey@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-11-10T05:15:13.215Z",
    "lastRunDate": "2025-01-14T20:15:55.473Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Schowalter - Beier",
      "Kohler and Sons",
      "Crona, Ziemann and Bosco",
      "Metz - Franey",
      "Kulas - Swaniawski",
      "Ankunding, Wintheiser and Hammes",
      "Fay - Block"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Jacobson, Hoeger and Jacobs",
      "Hermiston Group",
      "Ledner - Conn",
      "Shields - Durgan"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      97,
      91,
      77,
      148,
      166,
      63,
      88,
      172,
      193,
      48,
      3,
      29,
      61,
      190,
      6,
      168,
      142
    ],
    "last_login": "2024-11-08T17:41:04.586Z"
  },
  {
    "id": "acbfde0f-4f0f-491d-90e1-0cc4cdffdc71",
    "notificationName": "temeritas bellicus carus",
    "triggerState": "waiting",
    "email": "Dortha19@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-08-29T23:01:16.536Z",
    "lastRunDate": "2025-01-15T00:19:46.759Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Stroman - Lynch",
      "Kohler - Abbott",
      "Gutkowski Group",
      "Glover Group",
      "Johns - Macejkovic",
      "Brown, Bradtke and Tromp",
      "Marks Inc",
      "Lakin, Medhurst and O'Conner",
      "Littel, Romaguera and Crist",
      "Lakin LLC"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Kris Group",
      "Glover and Sons",
      "Lindgren - Langosh",
      "Kihn - Parisian"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      129,
      177,
      6,
      129,
      111,
      98,
      57,
      87,
      6,
      43,
      162,
      164,
      29,
      167,
      32,
      11,
      165,
      84
    ],
    "last_login": "2024-12-16T14:56:57.455Z"
  },
  {
    "id": "2a1e579b-a45f-466a-934d-514342aba72b",
    "notificationName": "adfectus angustus aliquid",
    "triggerState": "running",
    "email": "Otilia21@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-02-16T02:58:01.506Z",
    "lastRunDate": "2025-01-14T10:51:27.513Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Miller - Hilpert",
      "Effertz Inc",
      "Funk, Schmitt and Graham",
      "Waters, Barton and Waters",
      "Gottlieb - Conroy",
      "Kunde LLC",
      "Daugherty - Mitchell"
    ],
    "role": "Manager",
    "status": false,
    "companies": [
      "Morar, Pacocha and Mosciski",
      "Gislason and Sons"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      54,
      4,
      41,
      35,
      147,
      144,
      187,
      46,
      189,
      51,
      167,
      157,
      30
    ],
    "last_login": "2024-12-17T09:57:17.474Z"
  },
  {
    "id": "b3b55826-96e2-45c0-af12-a12f368ad356",
    "notificationName": "ars",
    "triggerState": "completed",
    "email": "Katrine37@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-10-13T03:39:07.719Z",
    "lastRunDate": "2025-01-15T04:55:30.753Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "McDermott, Spencer and Lowe",
      "Swift - Grady",
      "Labadie Inc",
      "Doyle, Jast and Dibbert",
      "Rutherford - Quigley",
      "Kiehn, Gibson and Koss",
      "Kautzer - Schmitt"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Doyle Inc",
      "Rosenbaum - Monahan",
      "Kutch, Lueilwitz and Wolf",
      "Sipes - Morar"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      118,
      74,
      200,
      11,
      4,
      198,
      53,
      84,
      56,
      138,
      61,
      198,
      146,
      18,
      45,
      10,
      28,
      196
    ],
    "last_login": "2024-12-11T15:50:34.244Z"
  },
  {
    "id": "d224ee10-29ce-4c23-9163-27a99a262107",
    "notificationName": "tandem demitto",
    "triggerState": "running",
    "email": "Antonio23@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-02-29T15:13:01.658Z",
    "lastRunDate": "2025-01-14T18:00:03.397Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Cummerata, Emard and Hoeger",
      "Gleason - Braun",
      "Barton - Erdman",
      "Okuneva, Schaden and Krajcik",
      "Kuvalis Inc",
      "Torp and Sons",
      "Bins, McGlynn and Romaguera",
      "Kuhn, Brakus and Thiel"
    ],
    "role": "User",
    "status": false,
    "companies": [
      "Kuphal Group"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      183,
      81,
      119
    ],
    "last_login": "2024-03-27T21:39:36.614Z"
  },
  {
    "id": "32a8da93-22c7-4d48-9bd5-905b72de6820",
    "notificationName": "demens placeat",
    "triggerState": "completed",
    "email": "Theodore0@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-12-09T08:14:37.646Z",
    "lastRunDate": "2025-01-15T00:57:17.819Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Beer - Kirlin",
      "Dooley - Cartwright",
      "Roob - Flatley",
      "Boyle, Abshire and Kuhlman",
      "Casper - Bartell",
      "Murazik and Sons",
      "Okuneva - Ryan",
      "Larson - Hudson",
      "Marks and Sons",
      "Upton, Renner and Weimann"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Cole, Hettinger and Kub"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      137,
      174,
      164,
      177,
      161,
      99,
      23,
      24,
      50,
      180,
      74,
      2,
      30,
      73
    ],
    "last_login": "2024-11-28T18:29:52.906Z"
  },
  {
    "id": "f003fbd1-5cb7-4db4-84e6-6122ddf7188f",
    "notificationName": "arceo",
    "triggerState": "waiting",
    "email": "Kole63@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-11-14T05:51:09.718Z",
    "lastRunDate": "2025-01-14T13:52:05.202Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Hettinger, Schamberger and Glover",
      "Cronin Group",
      "Hoppe and Sons",
      "Trantow LLC",
      "Kuhlman LLC",
      "King - Schultz",
      "Wuckert, Will and Satterfield",
      "Anderson, Hayes and Connelly",
      "Bogisich LLC"
    ],
    "role": "User",
    "status": false,
    "companies": [
      "Sanford and Sons",
      "Leffler and Sons"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      88,
      63,
      55,
      120,
      79,
      15,
      192,
      153,
      120,
      28,
      140,
      18,
      95,
      61
    ],
    "last_login": "2024-04-22T08:31:37.701Z"
  },
  {
    "id": "dd3f8a38-0b31-4d2d-b9a4-2455c68b3f11",
    "notificationName": "stultus studio",
    "triggerState": "completed",
    "email": "Wendy_Leffler79@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-08-15T20:04:52.772Z",
    "lastRunDate": "2025-01-14T18:47:53.602Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Schumm - Block",
      "Orn and Sons",
      "Price - Walter",
      "King, Nikolaus and Von",
      "Krajcik Inc"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Ratke LLC",
      "Beatty - Hilpert",
      "Brakus Inc",
      "Roob LLC"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      175,
      114,
      3,
      89,
      43,
      130,
      39,
      137
    ],
    "last_login": "2024-05-04T22:21:53.398Z"
  },
  {
    "id": "c236c0ac-44f1-4658-b7ae-b7fe595ff88a",
    "notificationName": "unus",
    "triggerState": "completed",
    "email": "Adrain6@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-12-23T19:32:33.081Z",
    "lastRunDate": "2025-01-15T03:39:26.443Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Ankunding - Bogan",
      "Stanton - Feeney",
      "Lueilwitz - Lockman",
      "Labadie - Grimes",
      "Kovacek, Corwin and Kulas",
      "Dickinson, Beahan and Watsica",
      "Altenwerth, Raynor and Bartoletti",
      "Kshlerin - Deckow",
      "Kling Inc"
    ],
    "role": "User",
    "status": false,
    "companies": [
      "Wuckert Inc",
      "Fahey, Gottlieb and Morar",
      "Stanton Inc"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      47,
      45,
      170,
      45,
      96,
      138,
      20,
      162,
      184,
      58,
      119
    ],
    "last_login": "2024-11-22T20:36:29.316Z"
  },
  {
    "id": "ea1cd9c0-b49e-416c-8a75-460dadaf388a",
    "notificationName": "suspendo ducimus cernuus",
    "triggerState": "running",
    "email": "Milan37@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-11-09T15:10:31.101Z",
    "lastRunDate": "2025-01-14T18:38:04.932Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Walsh - Kub",
      "VonRueden, Boyer and VonRueden",
      "Johnson, Kuhn and Dibbert",
      "Senger - Okuneva",
      "Dach, O'Hara and Barrows",
      "Bayer Group",
      "O'Keefe, Will and Kunde",
      "Lind and Sons",
      "Heller LLC",
      "Armstrong, Green and Kohler"
    ],
    "role": "User",
    "status": false,
    "companies": [
      "Miller - Zieme",
      "Lockman, Smith and VonRueden",
      "Spinka and Sons"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      95,
      173,
      166,
      69,
      118,
      197,
      3,
      117,
      56,
      42,
      174,
      40,
      43
    ],
    "last_login": "2024-06-06T02:48:07.178Z"
  },
  {
    "id": "a84290af-f49c-4895-9479-ba20ef41311e",
    "notificationName": "excepturi",
    "triggerState": "running",
    "email": "Priscilla_Klein47@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-03-16T19:34:39.829Z",
    "lastRunDate": "2025-01-14T10:45:12.318Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Zboncak - Schultz",
      "Denesik - Homenick",
      "Parker - Batz",
      "Moore LLC",
      "Carter LLC",
      "Lowe, Haag and Shields",
      "Steuber - Collins"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Farrell Inc",
      "Dicki Group",
      "Schaden and Sons"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [],
    "last_login": "2024-01-29T07:34:29.747Z"
  },
  {
    "id": "8ad3d9e2-62e2-446f-92f7-fdf589e3112f",
    "notificationName": "civitas decretum",
    "triggerState": "completed",
    "email": "Cyrus22@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-10-03T21:36:13.899Z",
    "lastRunDate": "2025-01-14T20:58:15.038Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Schmeler Group",
      "Hane Group",
      "Greenfelder Group",
      "Beatty - Reilly",
      "Koch, Champlin and Ortiz",
      "Shanahan - Reinger",
      "Kessler - Hahn",
      "McLaughlin Inc",
      "Lubowitz and Sons"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Hudson, White and Adams",
      "Hills - Terry"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      143,
      167,
      18,
      92
    ],
    "last_login": "2024-05-23T22:52:53.514Z"
  },
  {
    "id": "a3fe2539-eadf-4377-a734-44ba9189ec65",
    "notificationName": "altus",
    "triggerState": "waiting",
    "email": "Kamren_Schaden23@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-08-05T16:56:27.951Z",
    "lastRunDate": "2025-01-14T22:24:18.489Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Greenholt, Parker and Botsford",
      "Kuhic - Treutel",
      "Moore, Bruen and Hahn",
      "Denesik Group",
      "Kunde and Sons",
      "Herzog - Hane",
      "Deckow - Kunze",
      "Krajcik Group",
      "Murray Inc",
      "Murazik Group"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "Dach, McLaughlin and Herman",
      "Gusikowski, Heaney and Doyle",
      "McDermott, Anderson and Bruen"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      61,
      175,
      188,
      63,
      106,
      161,
      156,
      15,
      135,
      22,
      143,
      100,
      72,
      50,
      111,
      160,
      105,
      72
    ],
    "last_login": "2024-07-26T04:46:53.299Z"
  },
  {
    "id": "a0bc0734-7d6b-48d4-85d3-da4d539d04a5",
    "notificationName": "vulgus considero sollers",
    "triggerState": "waiting",
    "email": "Andre_Treutel77@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-03-10T16:03:36.798Z",
    "lastRunDate": "2025-01-14T21:36:59.586Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Zboncak Inc",
      "Jacobi LLC",
      "Reilly Inc",
      "Luettgen, Kub and Hamill",
      "Hammes - Boehm",
      "Pacocha LLC",
      "Emmerich - Pacocha"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "Jacobs, Abshire and Swaniawski"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      36,
      66,
      119,
      6,
      29,
      197,
      130,
      71,
      14,
      197,
      171,
      155
    ],
    "last_login": "2024-04-01T15:33:33.025Z"
  },
  {
    "id": "7f092251-7f68-4adc-9cd5-2250f3b07aed",
    "notificationName": "alius cetera verecundia",
    "triggerState": "running",
    "email": "Maribel.Schroeder@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-12-11T00:02:22.569Z",
    "lastRunDate": "2025-01-14T15:01:55.396Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Friesen - Wilkinson",
      "Hand Inc",
      "Lowe, Larson and Bahringer",
      "Breitenberg - Lueilwitz",
      "Mann Group",
      "Reinger and Sons",
      "Dooley and Sons",
      "Borer Inc",
      "Schowalter - Howell",
      "VonRueden Inc"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Weber - Cummerata",
      "Von Inc",
      "Bernhard LLC",
      "Murazik, O'Conner and Ledner"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      67,
      190,
      188,
      131,
      71,
      197
    ],
    "last_login": "2024-12-31T12:01:29.532Z"
  },
  {
    "id": "663c608b-a7ba-48f0-92a6-a116155651d3",
    "notificationName": "appositus statim carcer",
    "triggerState": "completed",
    "email": "Malinda61@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-03-11T11:46:12.315Z",
    "lastRunDate": "2025-01-14T10:03:32.574Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Lakin - Stokes",
      "Braun LLC",
      "Donnelly LLC",
      "Jacobi and Sons",
      "Pollich Group",
      "Gulgowski LLC",
      "Conroy, Hartmann and Erdman"
    ],
    "role": "User",
    "status": true,
    "companies": [
      "Kunde Group",
      "Friesen Inc",
      "Leannon and Sons"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      32,
      36,
      146,
      9,
      189,
      168,
      51
    ],
    "last_login": "2024-07-11T22:47:38.256Z"
  },
  {
    "id": "f1e7c56f-f159-431b-8041-e69842280c6d",
    "notificationName": "chirographum depono amicitia",
    "triggerState": "running",
    "email": "Michel.Hartmann-Stroman41@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-01-31T22:43:40.463Z",
    "lastRunDate": "2025-01-14T08:18:24.849Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Ortiz, Funk and Hansen",
      "Berge and Sons",
      "Schoen - Douglas",
      "Romaguera, Reynolds and VonRueden",
      "Heller, Heidenreich and Paucek"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Swaniawski, Wisozk and Bins"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      64,
      73,
      2,
      117,
      77,
      155,
      130,
      154,
      31,
      66,
      48,
      57,
      183,
      148,
      15,
      134,
      52
    ],
    "last_login": "2024-03-31T20:34:26.002Z"
  },
  {
    "id": "c385a46a-597e-46f5-b9de-a68064560335",
    "notificationName": "cohibeo",
    "triggerState": "waiting",
    "email": "Brycen_Walter@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-07-28T03:55:11.094Z",
    "lastRunDate": "2025-01-14T08:14:30.545Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Heidenreich, Kunde and Ondricka",
      "Weimann - Oberbrunner",
      "Parisian, Jakubowski and Collier",
      "Waters - MacGyver",
      "Erdman - Connelly",
      "Macejkovic and Sons",
      "Kuvalis Group",
      "Keebler - Brekke"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Hermann, Roob and Leuschke",
      "Steuber, McClure and Rippin",
      "Bechtelar Group"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      110,
      51,
      32,
      149,
      167,
      102,
      53,
      149,
      112,
      200,
      107,
      153,
      44,
      180
    ],
    "last_login": "2024-02-21T20:42:51.735Z"
  },
  {
    "id": "f6d25f13-76aa-4f9e-8ade-c972fc234f27",
    "notificationName": "sustineo",
    "triggerState": "completed",
    "email": "Pamela.Shanahan@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-01-22T16:38:33.997Z",
    "lastRunDate": "2025-01-14T20:04:21.324Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Hickle, Watsica and Bruen",
      "Raynor, Smitham and Bogan",
      "Reichert, Block and Hegmann",
      "Rowe, Glover and Jaskolski",
      "Kuphal, Bernier and Collier",
      "Witting and Sons",
      "Hahn, Mosciski and Kuhn",
      "Bahringer - Cartwright",
      "Erdman - Miller"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "Heathcote, Rutherford and Klein",
      "Blick, Luettgen and Walsh"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      199,
      24,
      8,
      60,
      35,
      137,
      61,
      138,
      28,
      175,
      180,
      188
    ],
    "last_login": "2024-06-18T02:55:52.440Z"
  },
  {
    "id": "44646972-d4b9-48e2-a030-32a63158136e",
    "notificationName": "curvo consectetur corrigo",
    "triggerState": "waiting",
    "email": "Mustafa_Kuphal@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-06-15T13:23:51.036Z",
    "lastRunDate": "2025-01-14T10:07:22.281Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Quigley and Sons",
      "Hartmann - Lind",
      "Purdy Group",
      "Legros - Zieme",
      "White - Wyman",
      "Mills Inc",
      "Kub, Brown and Schamberger",
      "Kunde - Turner",
      "Little, Schmidt and Rath",
      "Turcotte Inc"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Champlin - Morar",
      "Brown - Huels",
      "White, Conn and Schmidt",
      "Fahey - Heathcote"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      125,
      63,
      48,
      4,
      157,
      17,
      125,
      32,
      122,
      71,
      142,
      196,
      83,
      141
    ],
    "last_login": "2024-04-07T09:34:43.713Z"
  },
  {
    "id": "5fe22d7e-4026-4a15-a3c3-2f40ba2280bb",
    "notificationName": "unus id",
    "triggerState": "completed",
    "email": "Zelma.Watsica@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-02-23T03:54:38.498Z",
    "lastRunDate": "2025-01-14T16:19:04.658Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Sanford Inc",
      "Adams - Greenfelder",
      "Kub LLC",
      "Bergstrom, Marquardt and Kertzmann",
      "Kirlin, McKenzie and Bode",
      "Wunsch - Schmitt"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "Schoen - Abbott"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      42,
      8,
      121,
      32,
      66,
      102,
      120,
      4,
      184,
      188,
      18,
      133,
      91,
      76
    ],
    "last_login": "2024-02-10T20:01:40.204Z"
  },
  {
    "id": "bdeaf2d0-c67e-4ed3-8663-3c7736dd1057",
    "notificationName": "tantillus",
    "triggerState": "completed",
    "email": "Tiara_Hyatt@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-08-31T02:09:19.390Z",
    "lastRunDate": "2025-01-14T21:31:45.723Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Borer, Morissette and Donnelly",
      "Hane, Kassulke and Pfannerstill",
      "Harber LLC",
      "Brekke, Ward and Armstrong",
      "Wuckert LLC"
    ],
    "role": "UX Designer",
    "status": true,
    "companies": [
      "Harber Group",
      "Murphy, Dare and Runolfsson"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      78,
      85,
      10,
      110,
      11,
      62,
      76,
      66,
      20,
      20,
      150,
      175,
      107,
      177,
      10,
      121,
      117,
      6,
      104,
      2
    ],
    "last_login": "2024-01-29T11:42:44.907Z"
  },
  {
    "id": "1ab5fb22-fc17-4068-a3f7-043163afeb0d",
    "notificationName": "adfectus tego consequuntur",
    "triggerState": "running",
    "email": "Orlando_Johnson@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-11-10T04:35:52.929Z",
    "lastRunDate": "2025-01-14T23:43:27.809Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Brekke Group",
      "Lang, Pouros and Larson",
      "Stamm, Fadel and Collins",
      "Heller Group",
      "Cummings, Johnson and Kulas"
    ],
    "role": "Admin",
    "status": false,
    "companies": [
      "Jakubowski, Kris and Kovacek",
      "Quigley, Casper and Zulauf",
      "Schmeler, Jast and Purdy"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      33,
      41,
      68,
      170,
      71,
      178,
      6,
      42,
      106,
      184,
      2,
      120,
      51,
      82,
      165,
      126,
      112,
      143,
      19,
      3
    ],
    "last_login": "2024-09-14T07:24:00.572Z"
  },
  {
    "id": "94ddfe78-ccda-4438-9cd9-1c19aa6f81d5",
    "notificationName": "demulceo",
    "triggerState": "running",
    "email": "Nick67@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-04-27T07:46:35.475Z",
    "lastRunDate": "2025-01-15T02:27:55.201Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Brown, Yost and Cartwright",
      "Kuhic - Donnelly",
      "Green Inc",
      "Simonis and Sons",
      "Treutel, Lueilwitz and Rosenbaum",
      "Russel LLC",
      "Kuhlman - Breitenberg"
    ],
    "role": "User",
    "status": false,
    "companies": [
      "Dickens LLC"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      129,
      120,
      85,
      106,
      64,
      47,
      189,
      40,
      181,
      70,
      198,
      82,
      163,
      135,
      25,
      82,
      84,
      121,
      118,
      40
    ],
    "last_login": "2025-01-11T14:31:42.692Z"
  },
  {
    "id": "2f5ad8b2-00c0-4748-acf6-b0fbce98bed1",
    "notificationName": "vicissitudo caelum eius",
    "triggerState": "waiting",
    "email": "Jairo_McDermott-Tromp@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-03-18T06:51:04.947Z",
    "lastRunDate": "2025-01-14T06:26:50.277Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Nikolaus Group",
      "Keebler LLC",
      "Legros Group",
      "White - McDermott",
      "Yost, Gutkowski and DuBuque",
      "Fahey - Lemke"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Will Inc",
      "Abbott Inc"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      194,
      163,
      85,
      118,
      144,
      148,
      3,
      85,
      158,
      147,
      77,
      143,
      138,
      2,
      34,
      166,
      96,
      59
    ],
    "last_login": "2024-06-30T09:39:28.751Z"
  },
  {
    "id": "d269d944-00ba-43ad-8382-0c4e33c6ca47",
    "notificationName": "sint speciosus",
    "triggerState": "running",
    "email": "Otho.Moen@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-03-30T06:41:51.717Z",
    "lastRunDate": "2025-01-15T01:17:16.680Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Blick LLC",
      "Schneider and Sons",
      "Bins - Hoeger",
      "Buckridge Group",
      "Tillman and Sons",
      "O'Conner Group",
      "McKenzie, Pollich and Tillman"
    ],
    "role": "Manager",
    "status": false,
    "companies": [
      "Dickinson and Sons",
      "Beer, Kuhn and Jerde",
      "Borer, Tillman and Corkery",
      "Walsh Group"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      182,
      113
    ],
    "last_login": "2024-04-25T08:41:07.377Z"
  },
  {
    "id": "30558416-7da7-4920-a5b9-3daacb2abe00",
    "notificationName": "expedita caveo",
    "triggerState": "completed",
    "email": "Lester_Labadie76@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-02-15T11:06:35.778Z",
    "lastRunDate": "2025-01-14T18:22:38.137Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Weissnat Inc",
      "Cormier Inc",
      "Fritsch Group",
      "Corwin and Sons",
      "Kilback - Stracke",
      "Nitzsche and Sons"
    ],
    "role": "Admin",
    "status": false,
    "companies": [
      "Spencer LLC"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      133,
      154,
      109
    ],
    "last_login": "2024-02-13T05:05:09.311Z"
  },
  {
    "id": "7f291078-86b2-451a-a13c-d666a81587c8",
    "notificationName": "ciminatio sapiente modi",
    "triggerState": "waiting",
    "email": "Joseph.Lemke87@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-02-29T21:06:17.755Z",
    "lastRunDate": "2025-01-14T10:33:04.934Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Dibbert LLC",
      "White, Schaden and Harris",
      "Hyatt - Kirlin",
      "Murazik and Sons",
      "Trantow, Kreiger and Lesch"
    ],
    "role": "Admin",
    "status": false,
    "companies": [
      "Kshlerin - Luettgen",
      "Turcotte LLC",
      "Terry - Nolan"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      72,
      112,
      65,
      156,
      48
    ],
    "last_login": "2024-03-12T09:23:57.304Z"
  },
  {
    "id": "a20fe719-5275-4339-baaf-caa468ade309",
    "notificationName": "validus decretum",
    "triggerState": "completed",
    "email": "Delmer_Bins@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-08-06T14:52:19.693Z",
    "lastRunDate": "2025-01-14T19:57:03.073Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Veum, Tromp and Krajcik",
      "Greenholt Inc",
      "Murazik - Jenkins",
      "Farrell - Franey",
      "Skiles LLC",
      "Trantow, Wolff and Veum",
      "Shanahan, Mosciski and Becker",
      "Stiedemann, Little and Huels"
    ],
    "role": "Manager",
    "status": false,
    "companies": [
      "Zemlak - Rowe",
      "Leffler - Mertz",
      "Emmerich, Kihn and Stiedemann",
      "Beer - Hermiston"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      112,
      104,
      70,
      126,
      35,
      193,
      9,
      62,
      179,
      42,
      1,
      128,
      6
    ],
    "last_login": "2024-11-06T00:32:14.825Z"
  },
  {
    "id": "20f4684a-844f-4cbc-a1e9-5e5b7f8e4073",
    "notificationName": "arma acsi atque",
    "triggerState": "completed",
    "email": "Quentin96@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-08-20T17:00:57.368Z",
    "lastRunDate": "2025-01-14T22:02:20.608Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Ledner - Rath",
      "Smith LLC",
      "Runolfsdottir and Sons",
      "Botsford, Langosh and Mayer",
      "Jast and Sons"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Schimmel, Lemke and Carter",
      "Schulist, Reynolds and Harvey"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      84,
      4
    ],
    "last_login": "2024-10-17T02:02:24.442Z"
  },
  {
    "id": "608555ec-3a2b-4d50-b459-b8aba439c8d5",
    "notificationName": "valens pecto voluptate",
    "triggerState": "running",
    "email": "Magnus1@hotmail.com",
    "reoccurring": false,
    "creationDate": "2025-01-11T02:45:31.027Z",
    "lastRunDate": "2025-01-14T06:41:24.807Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Wyman and Sons",
      "Hodkiewicz, Russel and White",
      "Mueller, Hartmann and Wyman",
      "Armstrong Inc",
      "Carter Group"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Lueilwitz - Little"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      187,
      107,
      180,
      150,
      46,
      34,
      97,
      51,
      30,
      34,
      173,
      100
    ],
    "last_login": "2024-03-13T20:33:44.168Z"
  },
  {
    "id": "57d16aa5-7f4c-48d8-953e-bb0f491dda19",
    "notificationName": "cibo damnatio",
    "triggerState": "waiting",
    "email": "Isai_Walter-Keebler@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-05-20T00:34:49.611Z",
    "lastRunDate": "2025-01-14T14:03:54.756Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Wisozk Group",
      "Torphy - Schoen",
      "D'Amore - Kozey",
      "Daniel - Nikolaus",
      "Von - Wyman",
      "Becker, Welch and Bartell",
      "Hand, Ankunding and Bartell",
      "Zboncak, Hansen and Grimes"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "Hayes LLC"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      103,
      16,
      177,
      85,
      34,
      80,
      72,
      64,
      191,
      48,
      77,
      133
    ],
    "last_login": "2024-03-20T10:33:57.505Z"
  },
  {
    "id": "678cc07d-e8ce-460f-9ed1-1bffb7986b01",
    "notificationName": "cunctatio",
    "triggerState": "waiting",
    "email": "Nathanial.Considine@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-03-04T03:37:18.054Z",
    "lastRunDate": "2025-01-15T01:05:38.938Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Harris - O'Conner",
      "Fahey Group",
      "Stiedemann - Howe",
      "Fisher, Cruickshank and Bergnaum",
      "Conn, Daniel and Haag",
      "Morissette - Bednar",
      "Shields - Goldner",
      "Auer, Gutkowski and Lemke"
    ],
    "role": "User",
    "status": true,
    "companies": [
      "Bauch and Sons",
      "Lebsack and Sons",
      "Robel, Cronin and Boyle",
      "Macejkovic Inc"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      5,
      71,
      106,
      16,
      118,
      62,
      23
    ],
    "last_login": "2024-05-13T18:30:07.665Z"
  },
  {
    "id": "42001165-c287-44a5-9313-a5fa370c058f",
    "notificationName": "tabgo vado",
    "triggerState": "completed",
    "email": "Jarrett62@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-04-02T20:41:10.582Z",
    "lastRunDate": "2025-01-14T12:59:12.856Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Frami, Kovacek and DuBuque",
      "Wiza, Hagenes and Runte",
      "Schoen - Heller",
      "Mohr - Stehr",
      "McGlynn Group",
      "Marks - Becker"
    ],
    "role": "User",
    "status": true,
    "companies": [
      "Boehm - Wiza",
      "Gutmann - Cummings",
      "Walker, Huel and Johnson",
      "Crooks Inc"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      118,
      39,
      119,
      127,
      101,
      156,
      92,
      84,
      58,
      154,
      131,
      34,
      136,
      147
    ],
    "last_login": "2024-07-18T23:32:07.725Z"
  },
  {
    "id": "273814c9-d05a-4966-84c1-9b2db6cff54f",
    "notificationName": "sumo vir ager",
    "triggerState": "completed",
    "email": "Montana.Jast63@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-08-29T22:55:45.421Z",
    "lastRunDate": "2025-01-14T09:13:06.520Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "McClure Inc",
      "Batz Group",
      "MacGyver, Green and Jerde",
      "Schroeder - Lindgren",
      "Collins - Hane",
      "Turner, MacGyver and Feil",
      "O'Conner - Jones",
      "Krajcik - Wintheiser",
      "Lockman, Schulist and Bartell",
      "Stokes Group"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Kemmer, Borer and Wyman",
      "McClure - Greenfelder"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      17,
      93,
      15,
      113
    ],
    "last_login": "2024-12-10T08:42:31.239Z"
  },
  {
    "id": "1c0b68e4-3d32-43c6-a213-3a7773f6b349",
    "notificationName": "corpus deserunt vos",
    "triggerState": "waiting",
    "email": "Dimitri4@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-04-05T11:40:48.834Z",
    "lastRunDate": "2025-01-15T03:50:13.348Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Friesen and Sons",
      "Huels - McClure",
      "Cummerata, Nikolaus and Littel",
      "Goodwin, Kovacek and Cole",
      "D'Amore - Klein",
      "Mayer - Russel",
      "Dooley, Borer and Predovic"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Harber Inc",
      "Stroman Inc",
      "Erdman, Franecki and Watsica",
      "Deckow, Bednar and Von"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      136,
      163,
      162,
      133,
      140,
      98
    ],
    "last_login": "2024-02-20T12:13:45.976Z"
  },
  {
    "id": "c7f2473f-cbe2-4f5a-9196-c676f918c538",
    "notificationName": "contra",
    "triggerState": "running",
    "email": "Ollie_Bode@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-10-29T00:05:18.089Z",
    "lastRunDate": "2025-01-14T08:39:17.496Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Kemmer, Rolfson and Monahan",
      "Schuster - Runolfsdottir",
      "Lindgren, Leuschke and Morissette",
      "Hilll - Barton",
      "Schneider - DuBuque",
      "Nienow, Cassin and Towne",
      "Legros - Reinger",
      "Stehr and Sons",
      "Pacocha LLC"
    ],
    "role": "User",
    "status": false,
    "companies": [
      "Bartoletti - Grant",
      "Jacobs LLC",
      "Heller, Streich and Goyette"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      106,
      85,
      47,
      7,
      5,
      41,
      13,
      139
    ],
    "last_login": "2024-12-18T17:26:39.607Z"
  },
  {
    "id": "508e964e-8177-416d-8178-e36d66ae80f4",
    "notificationName": "sollers arto",
    "triggerState": "waiting",
    "email": "Rebekah.Stroman@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-10-12T19:08:08.102Z",
    "lastRunDate": "2025-01-15T00:45:06.246Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Schroeder, VonRueden and Schaefer",
      "Bergnaum, Howell and Brown",
      "Nitzsche LLC",
      "Pfannerstill, Wyman and Morissette",
      "Pouros, Schuppe and Torphy",
      "Zboncak and Sons",
      "Daniel Inc"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Bradtke, Sawayn and Hoppe"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      131,
      40,
      121,
      107,
      157
    ],
    "last_login": "2024-03-16T14:34:25.030Z"
  },
  {
    "id": "ae624a18-bb85-43a9-9f40-ea38ac4f0d0e",
    "notificationName": "derideo",
    "triggerState": "completed",
    "email": "Nikki_Lemke80@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-01-26T20:56:33.155Z",
    "lastRunDate": "2025-01-14T15:07:07.884Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Reilly Group",
      "Bogisich and Sons",
      "Yost, Langworth and O'Keefe",
      "Ruecker - Stroman",
      "Skiles, Becker and Ebert"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Borer, Pollich and Jenkins",
      "Tillman Group",
      "Shanahan Group",
      "Wiegand - Stanton"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      2,
      197,
      170,
      165,
      37,
      12,
      146,
      197,
      45,
      34,
      193,
      163,
      69
    ],
    "last_login": "2024-06-20T14:45:28.834Z"
  },
  {
    "id": "219beac4-ee85-439b-a152-faa6195c7688",
    "notificationName": "perferendis quibusdam apto",
    "triggerState": "waiting",
    "email": "Adonis.Heidenreich@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-03-24T19:08:37.840Z",
    "lastRunDate": "2025-01-14T12:12:57.429Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Wiza, Brekke and Crona",
      "McLaughlin Inc",
      "Ritchie - Luettgen",
      "Hyatt - Friesen",
      "Schumm, Greenfelder and Welch"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Bogan Inc",
      "Lindgren LLC",
      "Hoeger - Huels"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      13,
      54
    ],
    "last_login": "2024-05-13T12:34:52.373Z"
  },
  {
    "id": "74dc7d48-f4ae-428a-90ae-bc067d214bdb",
    "notificationName": "caelum terga",
    "triggerState": "waiting",
    "email": "Myah_Wilderman5@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-11-02T11:24:46.207Z",
    "lastRunDate": "2025-01-14T13:42:21.866Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Buckridge, Cummerata and Hickle",
      "Carter - Hilll",
      "Wunsch - Ernser",
      "Kunze Group"
    ],
    "role": "Manager",
    "status": false,
    "companies": [
      "Bartell, Johns and Hammes"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      4,
      149,
      55,
      74
    ],
    "last_login": "2024-10-11T04:09:37.792Z"
  },
  {
    "id": "d37aa1b9-041e-4016-9ce6-3cc387494737",
    "notificationName": "depraedor",
    "triggerState": "running",
    "email": "Humberto_Predovic@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-05-22T12:42:36.960Z",
    "lastRunDate": "2025-01-14T08:54:04.114Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Veum Inc",
      "Shanahan Inc",
      "Waelchi - Smith",
      "Bruen, D'Amore and Beatty",
      "Wunsch Group",
      "Gerlach - Hilpert"
    ],
    "role": "UX Designer",
    "status": true,
    "companies": [
      "Watsica - Bode",
      "Prosacco - Hirthe"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      191,
      136,
      126,
      35,
      187,
      92,
      35,
      83,
      23,
      197,
      58,
      103,
      41,
      194,
      111,
      48,
      12,
      156,
      63,
      172
    ],
    "last_login": "2024-06-17T23:22:22.961Z"
  },
  {
    "id": "73a26d81-029b-4f8a-86af-0344306c98f8",
    "notificationName": "volup catena",
    "triggerState": "waiting",
    "email": "Macy_Ziemann-Stehr34@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-07-22T16:56:42.827Z",
    "lastRunDate": "2025-01-14T10:15:27.222Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Jaskolski - Conn",
      "Robel - Wolf",
      "Bednar, Oberbrunner and Abshire",
      "Auer and Sons",
      "Leuschke Group"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Bernhard and Sons",
      "Nicolas, Bartoletti and Johnson",
      "Buckridge, Kshlerin and Runte"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      65,
      189,
      79,
      8,
      125,
      73,
      94,
      150,
      49,
      122,
      196
    ],
    "last_login": "2024-04-03T21:44:13.019Z"
  },
  {
    "id": "b7429233-b837-4688-8936-c6469b8ad5ab",
    "notificationName": "arceo",
    "triggerState": "waiting",
    "email": "Emelia_Green70@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-04-25T18:16:46.425Z",
    "lastRunDate": "2025-01-14T23:41:20.154Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "O'Kon - Feeney",
      "Watsica, Gleichner and Kautzer",
      "Berge - McDermott",
      "Cassin LLC",
      "Deckow LLC",
      "Marks - Grant",
      "Lueilwitz - Deckow",
      "Veum and Sons",
      "Ullrich, Lebsack and Orn",
      "Macejkovic and Sons"
    ],
    "role": "Manager",
    "status": false,
    "companies": [
      "Wisozk - Schowalter",
      "Botsford - Brekke",
      "Murray - West"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      44,
      112,
      10,
      180,
      10,
      140
    ],
    "last_login": "2024-11-06T09:28:34.277Z"
  },
  {
    "id": "b0630176-63e2-4728-9da6-cf93d4c14023",
    "notificationName": "audacia calcar aggero",
    "triggerState": "completed",
    "email": "Sophia_Terry@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-09-26T15:33:14.121Z",
    "lastRunDate": "2025-01-15T03:02:03.333Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Leannon, Breitenberg and McClure",
      "Hayes LLC",
      "Witting, Davis and Dare",
      "Weber, Carroll and Little",
      "D'Amore - Treutel",
      "Haag, Stracke and Ziemann"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "DuBuque and Sons",
      "Champlin, Satterfield and Koch"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      23,
      138,
      111
    ],
    "last_login": "2024-09-11T18:20:45.266Z"
  },
  {
    "id": "016c9c21-7cfe-4008-af51-834047101392",
    "notificationName": "copiose",
    "triggerState": "completed",
    "email": "Giuseppe.West@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-07-15T10:00:21.381Z",
    "lastRunDate": "2025-01-14T20:54:09.392Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Abernathy - Stroman",
      "Anderson, Lynch and Nader",
      "Bruen, Carroll and Langosh",
      "Goodwin - Koch",
      "Blanda, Schamberger and Rohan",
      "Renner - Ruecker"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "Kozey, Kulas and Toy"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      53,
      124,
      54,
      174,
      32,
      159,
      99,
      2,
      169
    ],
    "last_login": "2024-02-12T04:20:58.147Z"
  },
  {
    "id": "201267d0-4b97-47cf-a00b-26e2f60a9a58",
    "notificationName": "vivo facilis",
    "triggerState": "completed",
    "email": "Delaney27@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-05-12T01:48:16.820Z",
    "lastRunDate": "2025-01-15T05:14:19.808Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Schumm, Schaefer and Marks",
      "Kuhn Inc",
      "Lemke and Sons",
      "Collier Group",
      "Shields, Halvorson and Shields",
      "Reichel and Sons",
      "MacGyver - Pagac",
      "Cole - Hane",
      "Grimes - Sporer",
      "Boyle and Sons"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "DuBuque - Botsford",
      "Ledner, Douglas and Emmerich",
      "Ernser, Von and Blanda"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      164,
      93,
      110,
      149,
      161,
      99,
      95,
      183,
      16,
      195,
      4
    ],
    "last_login": "2024-10-13T09:49:59.894Z"
  },
  {
    "id": "651d15ab-48aa-4330-b330-fa3dc49500f3",
    "notificationName": "pecus crastinus",
    "triggerState": "waiting",
    "email": "Chadd.Grant@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-08-30T00:39:36.482Z",
    "lastRunDate": "2025-01-14T09:38:51.706Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Hand, Balistreri and Kirlin",
      "Krajcik and Sons",
      "Walter and Sons",
      "Jacobi Group"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Bogan Inc",
      "McKenzie - McCullough",
      "Klocko - Greenfelder",
      "Beer - Fisher"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      52,
      100,
      52,
      165,
      98,
      79,
      47,
      49,
      24,
      25,
      48,
      123,
      17,
      195,
      125,
      91,
      32,
      108,
      116,
      160
    ],
    "last_login": "2024-02-11T16:53:09.648Z"
  },
  {
    "id": "b8a5c6d1-1623-4fe5-8cfd-e60d125804e9",
    "notificationName": "contego",
    "triggerState": "waiting",
    "email": "Victor.McKenzie11@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-08-05T22:15:34.493Z",
    "lastRunDate": "2025-01-14T07:37:47.411Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Rutherford and Sons",
      "Bruen Inc",
      "Bernier, Kessler and Mayert",
      "Feeney Group",
      "Metz - Farrell",
      "Rodriguez, Donnelly and Hettinger",
      "Mante - Kris",
      "Bogan - Wiza",
      "Powlowski - Weber",
      "Funk, Bauch and Sawayn"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Glover, Effertz and Ryan",
      "Dickinson - Dooley"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      34,
      195,
      39,
      197,
      173,
      158,
      178,
      5,
      63,
      87,
      65,
      82,
      33,
      62,
      122,
      71,
      166,
      147,
      64,
      64
    ],
    "last_login": "2024-03-22T04:03:46.703Z"
  },
  {
    "id": "557be10d-7fe4-409b-8a6c-3fe077eb13c3",
    "notificationName": "quod contigo",
    "triggerState": "running",
    "email": "Florencio.Hoppe@hotmail.com",
    "reoccurring": false,
    "creationDate": "2025-01-04T05:16:07.890Z",
    "lastRunDate": "2025-01-14T10:33:01.468Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Wunsch, Buckridge and Weimann",
      "Hartmann - Thiel",
      "McCullough, Bayer and Luettgen",
      "Torp Inc"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Huels and Sons",
      "Hane - Crooks"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      79,
      31,
      56,
      80,
      47,
      47,
      162,
      155,
      17
    ],
    "last_login": "2024-05-02T16:07:03.634Z"
  },
  {
    "id": "c8bc30bd-e963-4402-b2d5-bc4fc83a52d3",
    "notificationName": "defessus vilis terga",
    "triggerState": "running",
    "email": "Johann76@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-09-14T10:27:21.444Z",
    "lastRunDate": "2025-01-14T22:50:15.326Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Gutmann - Hilpert",
      "Cummings, Sipes and Daugherty",
      "Wyman - Bashirian",
      "Kuvalis - Veum",
      "Koelpin, Fahey and Sipes",
      "Huel, Williamson and Kautzer",
      "Kemmer, Koelpin and Hilpert",
      "Nienow Inc",
      "Fisher - Bode"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Jacobson - Goodwin",
      "McClure Group"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      88,
      197,
      187,
      91,
      37,
      147,
      33,
      182,
      69,
      97,
      59,
      98,
      97,
      165,
      6
    ],
    "last_login": "2024-08-15T17:39:56.100Z"
  },
  {
    "id": "80c45859-4b53-4dce-896f-bf266f1def81",
    "notificationName": "theatrum",
    "triggerState": "waiting",
    "email": "Akeem23@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-08-30T19:46:35.880Z",
    "lastRunDate": "2025-01-14T10:59:49.258Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Witting Inc",
      "Braun and Sons",
      "O'Reilly - Swift",
      "Kilback, Ruecker and Bode",
      "Conroy, Lakin and King",
      "Mertz - Roob",
      "Doyle LLC",
      "Nolan - Nikolaus",
      "Emard - Crona"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Wuckert, Homenick and Kilback",
      "Rempel - Kuhic",
      "Kub Group"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      190,
      196
    ],
    "last_login": "2024-09-12T08:52:49.678Z"
  },
  {
    "id": "b376d813-e801-44d1-892d-f076db716e7a",
    "notificationName": "aeger pauci",
    "triggerState": "completed",
    "email": "Clarissa_Jacobs@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-12-31T10:31:33.484Z",
    "lastRunDate": "2025-01-14T23:31:48.229Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Murazik, Smitham and Jerde",
      "Spinka - Bruen",
      "Swift, Welch and Koch",
      "Balistreri, Wolf and Wisoky",
      "Mann and Sons",
      "Will - Upton"
    ],
    "role": "Developer",
    "status": false,
    "companies": [
      "Pollich, Sanford and Toy"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      176,
      190,
      13,
      16,
      42,
      168,
      61,
      156,
      172,
      47,
      77,
      24,
      10,
      55,
      153,
      94,
      176,
      76
    ],
    "last_login": "2024-04-05T19:35:44.682Z"
  },
  {
    "id": "c8f6d7f8-a740-4d82-9edd-55139bc4b9ca",
    "notificationName": "curia ventito tam",
    "triggerState": "waiting",
    "email": "Lindsey43@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-07-11T18:00:40.266Z",
    "lastRunDate": "2025-01-14T10:53:59.459Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Mitchell - Haag",
      "Wuckert, O'Keefe and Keebler",
      "Haley LLC",
      "Roob - Rogahn",
      "Kling - Conn",
      "Schinner Group",
      "Ernser and Sons",
      "Emmerich - Sawayn",
      "Sporer - Kris"
    ],
    "role": "Admin",
    "status": false,
    "companies": [
      "Jerde, Von and Stark",
      "Grady - Bins",
      "Schmitt, Reichert and Renner",
      "Daugherty - Jones"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [],
    "last_login": "2024-01-27T11:06:58.119Z"
  },
  {
    "id": "c078521d-2cc5-4bb8-a8cd-a8bf34d64511",
    "notificationName": "ipsum cerno",
    "triggerState": "waiting",
    "email": "Marlene_Medhurst19@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-12-07T10:02:46.328Z",
    "lastRunDate": "2025-01-14T14:17:07.016Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Hand Inc",
      "Bernhard Inc",
      "Dibbert - Kuhlman",
      "Heller, Bruen and Lehner",
      "Pfannerstill, Green and Bogan",
      "Ullrich, McGlynn and Keeling",
      "Flatley - Shanahan"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Mertz Group",
      "Jaskolski and Sons",
      "Beier - Sporer"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      137,
      71,
      1,
      188,
      52,
      138,
      183,
      179,
      9,
      129,
      87
    ],
    "last_login": "2024-11-18T04:47:33.307Z"
  },
  {
    "id": "9792fa94-6716-42d1-bc24-9fe8b94d28f9",
    "notificationName": "solus abduco",
    "triggerState": "running",
    "email": "Rosendo.Towne@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-04-14T12:31:50.573Z",
    "lastRunDate": "2025-01-14T22:48:38.838Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Jacobs Group",
      "Moore and Sons",
      "Padberg, Fadel and Lesch",
      "Koch - Luettgen",
      "Weissnat - O'Connell",
      "Block, McLaughlin and Lindgren",
      "Gibson LLC"
    ],
    "role": "User",
    "status": true,
    "companies": [
      "Satterfield - Weber",
      "Keebler - Torp",
      "Schaefer Group",
      "Strosin LLC"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      4,
      44,
      129,
      62,
      82,
      146,
      53,
      173,
      43,
      144,
      130,
      157
    ],
    "last_login": "2024-02-29T12:13:19.762Z"
  },
  {
    "id": "f6b9455e-7dab-43c0-aa5b-9ee1e79572a4",
    "notificationName": "voluptate deficio",
    "triggerState": "waiting",
    "email": "Jesse.Kessler34@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-05-04T19:40:39.574Z",
    "lastRunDate": "2025-01-15T02:10:10.377Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Moore Group",
      "Hills - Tremblay",
      "Jacobson - Leuschke",
      "Miller - Turcotte",
      "Leffler - Kunze"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Wiza LLC"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      26,
      57,
      163,
      65,
      179,
      3,
      14,
      22,
      19,
      118,
      17,
      93
    ],
    "last_login": "2024-06-13T00:59:37.556Z"
  },
  {
    "id": "f5901f68-3b68-4bab-8e16-517f2db8c553",
    "notificationName": "condico celo",
    "triggerState": "waiting",
    "email": "Dawson82@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-07-27T01:59:18.705Z",
    "lastRunDate": "2025-01-14T11:37:45.244Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Gislason, Conn and Ward",
      "Mante, Sawayn and Ledner",
      "Haley, Thiel and Lockman",
      "Cronin, Howell and Stiedemann",
      "Zulauf Inc",
      "Kirlin, McDermott and Tillman",
      "Gislason Group"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Pfeffer - Lebsack",
      "Wilderman - Toy",
      "Block and Sons"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [],
    "last_login": "2024-07-17T05:18:39.140Z"
  },
  {
    "id": "9102bd3c-97de-46ee-965c-9fe571de04a7",
    "notificationName": "cetera templum",
    "triggerState": "waiting",
    "email": "Zoie76@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-06-19T02:29:36.196Z",
    "lastRunDate": "2025-01-14T07:10:36.855Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Streich - Haag",
      "Stokes and Sons",
      "Spinka - Mann",
      "Stokes - Brekke",
      "Thompson Group",
      "Little LLC",
      "Glover - Kohler",
      "Doyle, Brekke and Wehner"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "McLaughlin and Sons"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      65,
      3,
      154,
      68
    ],
    "last_login": "2024-05-23T18:37:05.760Z"
  },
  {
    "id": "83a22f45-bbed-4649-a20d-043e39ebfe3b",
    "notificationName": "magnam vir coerceo",
    "triggerState": "running",
    "email": "Wanda.Volkman59@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-12-28T23:57:19.696Z",
    "lastRunDate": "2025-01-15T05:19:18.372Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Klein - Farrell",
      "Walsh, Torp and Brown",
      "Wiegand, Bins and Shields",
      "Beatty - Wunsch",
      "Larson - Emmerich",
      "Gusikowski and Sons",
      "Okuneva, Lubowitz and Powlowski",
      "Feest, Dare and Dare",
      "McCullough - Hilll",
      "Bode LLC"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Howe - Hoeger",
      "Rippin, Murray and Schneider"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      51,
      112,
      40,
      187,
      29,
      151,
      199,
      35,
      43,
      73,
      56,
      138
    ],
    "last_login": "2024-07-27T01:34:24.847Z"
  },
  {
    "id": "f15c9e3f-8fbc-4e39-904b-54928057cd6b",
    "notificationName": "coniecto adduco uxor",
    "triggerState": "waiting",
    "email": "Buck_Denesik@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-09-13T03:46:52.676Z",
    "lastRunDate": "2025-01-14T23:16:09.496Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Hammes Group",
      "Funk - Hyatt",
      "Towne - Witting",
      "Schinner, Johnston and Moen",
      "McClure LLC",
      "Boyer, Watsica and Rippin",
      "Breitenberg, Leffler and Hermann"
    ],
    "role": "Admin",
    "status": false,
    "companies": [
      "Hodkiewicz - Wisozk",
      "Dibbert - Cartwright",
      "Fisher - Corkery"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      22,
      23,
      147,
      38,
      16,
      80,
      54,
      21,
      9,
      91,
      176,
      188,
      50,
      127,
      98,
      15
    ],
    "last_login": "2024-04-06T16:50:54.939Z"
  },
  {
    "id": "8710a316-afe0-4d53-8b86-8506cd2179fe",
    "notificationName": "clam crux",
    "triggerState": "completed",
    "email": "Amaya_Conn@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-05-30T15:20:52.908Z",
    "lastRunDate": "2025-01-15T01:07:00.365Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Tillman - Reinger",
      "Towne, Cole and Adams",
      "Bosco Inc",
      "Zulauf - Simonis",
      "Morar and Sons"
    ],
    "role": "User",
    "status": true,
    "companies": [
      "Fadel Inc",
      "Schroeder - Kilback",
      "Turner - Windler"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      182,
      31,
      182,
      160,
      17,
      23,
      114,
      46
    ],
    "last_login": "2024-07-19T13:15:48.938Z"
  },
  {
    "id": "3b71e665-d9e8-45a9-bdea-86aed64d48c0",
    "notificationName": "subseco libero versus",
    "triggerState": "running",
    "email": "Wendell79@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-10-23T00:27:11.912Z",
    "lastRunDate": "2025-01-14T22:17:42.831Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Ankunding, Stamm and Schultz",
      "Wisoky Inc",
      "Nienow, Ledner and Ryan",
      "Wintheiser, Medhurst and Pacocha"
    ],
    "role": "Manager",
    "status": false,
    "companies": [
      "Weissnat - Langworth",
      "O'Hara, Murazik and Bailey",
      "Lemke Group",
      "Stehr, Fay and Prohaska"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      30,
      111,
      65,
      184,
      8,
      26
    ],
    "last_login": "2024-09-22T18:23:42.492Z"
  },
  {
    "id": "0c83c2bc-934b-4c35-a262-eb85e3bdb4c8",
    "notificationName": "cogito terga",
    "triggerState": "running",
    "email": "Dejon84@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-11-11T15:18:09.943Z",
    "lastRunDate": "2025-01-14T13:03:14.797Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Gottlieb - Morar",
      "Von - Schimmel",
      "Reinger LLC",
      "Grant - Kuphal",
      "Heaney Group",
      "Brakus - D'Amore",
      "Wolff - Fritsch",
      "Anderson - Mayer"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Pagac Inc",
      "Runolfsdottir Group",
      "Block and Sons"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      200,
      96,
      127,
      5,
      185,
      156,
      39,
      74
    ],
    "last_login": "2024-11-04T00:11:11.908Z"
  },
  {
    "id": "533aa33d-b359-41ee-ba18-29d5e8ed1cb3",
    "notificationName": "substantia",
    "triggerState": "completed",
    "email": "Lue.Purdy94@yahoo.com",
    "reoccurring": true,
    "creationDate": "2025-01-03T07:02:15.087Z",
    "lastRunDate": "2025-01-14T21:56:19.645Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Renner - Rosenbaum",
      "Hauck, Kling and Thompson",
      "Frami - Smith",
      "Reinger Inc"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Russel LLC",
      "Welch - Schaefer",
      "Quitzon - Dicki",
      "Schumm Inc"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      21,
      107
    ],
    "last_login": "2024-08-30T16:19:44.979Z"
  },
  {
    "id": "4c51a11f-cb3b-4efd-ac4e-a9cb9144816e",
    "notificationName": "admoveo beneficium videlicet",
    "triggerState": "waiting",
    "email": "Leanne86@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-04-04T02:34:47.901Z",
    "lastRunDate": "2025-01-14T10:55:12.746Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Rempel - Roberts",
      "O'Reilly, Langosh and Daugherty",
      "White Group",
      "Carter - Predovic",
      "Jaskolski LLC",
      "Lebsack - Jakubowski",
      "Graham and Sons",
      "Walter and Sons"
    ],
    "role": "User",
    "status": false,
    "companies": [
      "Stracke, Wehner and Franey",
      "Rutherford LLC"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      139,
      160,
      67,
      57,
      71,
      171,
      26,
      141,
      42,
      38,
      197,
      72,
      70
    ],
    "last_login": "2024-08-10T13:25:52.857Z"
  },
  {
    "id": "c6e49621-bb8e-481a-a61f-84b8309172e2",
    "notificationName": "ter",
    "triggerState": "running",
    "email": "Reagan.Wilkinson72@hotmail.com",
    "reoccurring": true,
    "creationDate": "2024-07-25T01:53:34.091Z",
    "lastRunDate": "2025-01-15T05:16:58.398Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Sauer - Turner",
      "Zulauf Group",
      "Ledner - Erdman",
      "Moen, Kshlerin and Beier"
    ],
    "role": "User",
    "status": true,
    "companies": [
      "Klein Group",
      "Davis - Torphy",
      "Dietrich - Bruen"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      60,
      93,
      140,
      183,
      21,
      10,
      137,
      185,
      53,
      159,
      101,
      94,
      12
    ],
    "last_login": "2024-11-21T01:47:12.297Z"
  },
  {
    "id": "eaa7f759-8faf-4625-a7b7-2a12c2fc838d",
    "notificationName": "volva tametsi",
    "triggerState": "running",
    "email": "Ryder30@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-12-13T00:58:01.129Z",
    "lastRunDate": "2025-01-14T08:38:44.255Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Glover - Gutmann",
      "Stiedemann LLC",
      "Wyman - Prosacco",
      "Miller - Cronin",
      "Emard and Sons",
      "Langosh - Kassulke",
      "Kuphal Inc"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Sauer LLC"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      119,
      191,
      126,
      5,
      177,
      171,
      114,
      85,
      179,
      5,
      159,
      174,
      141,
      120,
      165,
      194,
      137,
      60,
      47,
      140
    ],
    "last_login": "2024-02-09T12:30:22.594Z"
  },
  {
    "id": "abf2546f-869d-4c8e-a5cc-64d5890ff4cb",
    "notificationName": "temptatio paens",
    "triggerState": "running",
    "email": "Hermann_Kihn85@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-09-02T02:55:41.265Z",
    "lastRunDate": "2025-01-14T10:55:37.236Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Ryan - Turcotte",
      "Wilderman, Brakus and Emard",
      "Schmeler - Bahringer",
      "Volkman and Sons",
      "Jones, Cole and Huels",
      "Moore - Langworth",
      "Beer Group",
      "Simonis, Rempel and Homenick",
      "Goodwin - Predovic",
      "Osinski - Rempel"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Kerluke, Corkery and West"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      69,
      111,
      51,
      36,
      138,
      19,
      52,
      166,
      179,
      121,
      13,
      162
    ],
    "last_login": "2024-10-08T21:05:30.058Z"
  },
  {
    "id": "5efcb5b8-b237-4b3c-a746-975b558e26d3",
    "notificationName": "titulus",
    "triggerState": "waiting",
    "email": "Jeanette47@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-08-17T05:06:12.456Z",
    "lastRunDate": "2025-01-15T02:46:48.868Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Zemlak, Gottlieb and Rosenbaum",
      "Gleichner, McGlynn and Herzog",
      "Ondricka LLC",
      "Hartmann LLC",
      "Walker - Bailey",
      "Rolfson - Prohaska",
      "Glover - Upton",
      "Fay LLC",
      "Osinski, Franey and Luettgen"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "Hahn - Paucek",
      "Mayert LLC",
      "Gulgowski - Pouros",
      "Schaden, Larkin and Wolf"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      158
    ],
    "last_login": "2025-01-08T16:14:23.785Z"
  },
  {
    "id": "5cbb5fb8-1c69-4fb1-9258-4201a00e04ce",
    "notificationName": "bestia vilicus",
    "triggerState": "running",
    "email": "Rebeka_Stroman79@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-11-13T16:09:16.813Z",
    "lastRunDate": "2025-01-14T18:31:52.725Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Yost - Lubowitz",
      "Moen Inc",
      "Cronin Inc",
      "Bergnaum LLC",
      "Kilback - Beer"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Rau, Bernier and Jacobi",
      "Rice, Hansen and Bednar",
      "Weber - Dickens"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      170,
      156,
      48,
      139
    ],
    "last_login": "2024-09-28T15:12:17.636Z"
  },
  {
    "id": "cd8879b1-7c61-48fe-a4d2-a0a870b40b3a",
    "notificationName": "adhuc casso adipisci",
    "triggerState": "running",
    "email": "Leif_Frami@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-07-02T19:28:22.150Z",
    "lastRunDate": "2025-01-14T21:17:56.084Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Goyette, Kihn and Trantow",
      "Dibbert - Maggio",
      "Kub, Kling and Murray",
      "Mitchell LLC",
      "Keebler, West and Leffler",
      "Upton - Auer",
      "Connelly Inc",
      "Runte - Fay",
      "Gutkowski - Graham",
      "Mohr and Sons"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Ullrich, Hamill and Lindgren",
      "Dicki, Kuvalis and Ward",
      "Hudson, Johnston and Padberg"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      113,
      41,
      115,
      175,
      40,
      113,
      17,
      94,
      106,
      36,
      144,
      23,
      166,
      189,
      139
    ],
    "last_login": "2024-07-22T18:36:35.989Z"
  },
  {
    "id": "ad44dbf8-8104-41ba-bf57-5d389d779d2b",
    "notificationName": "tepidus spectaculum",
    "triggerState": "running",
    "email": "Diamond_Schultz@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-11-04T16:17:36.825Z",
    "lastRunDate": "2025-01-14T18:46:52.925Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Moen, Mayert and Huels",
      "Deckow, Kiehn and Pfannerstill",
      "Kuvalis - Hirthe",
      "Volkman, Kilback and Kohler",
      "Aufderhar - Runte"
    ],
    "role": "UX Designer",
    "status": true,
    "companies": [
      "Schowalter Group"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      61,
      19,
      194,
      66,
      71,
      122,
      165,
      180,
      13,
      91,
      173,
      61,
      179
    ],
    "last_login": "2024-05-10T20:52:45.569Z"
  },
  {
    "id": "636779d0-77af-44b7-b796-f7d98587fb5d",
    "notificationName": "aeger admiratio tabgo",
    "triggerState": "waiting",
    "email": "Cade.Wyman6@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-05-23T02:23:36.150Z",
    "lastRunDate": "2025-01-14T13:05:06.555Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Cormier, Casper and Morissette",
      "Kub - Bartell",
      "Glover, Koepp and Monahan",
      "Stehr and Sons",
      "Baumbach Inc"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Bashirian Inc",
      "Douglas - Hirthe"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      1,
      136,
      154,
      69,
      127,
      135,
      159,
      112,
      19,
      65,
      164,
      200,
      131,
      190,
      149
    ],
    "last_login": "2024-12-25T07:42:50.669Z"
  },
  {
    "id": "85d7af8b-6be8-4f25-95b8-b7e649f0c102",
    "notificationName": "suus dolorum velum",
    "triggerState": "waiting",
    "email": "Halie_Farrell@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-01-26T23:23:32.744Z",
    "lastRunDate": "2025-01-14T19:41:27.596Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Watsica, Stanton and Fritsch",
      "Rosenbaum - Streich",
      "Legros Group",
      "Block - Hauck",
      "Runte and Sons",
      "Langworth - Rau",
      "Ullrich, Beer and Wisozk",
      "Collins, Watsica and Predovic",
      "Greenfelder, Yundt and Howell",
      "Grimes, Wisoky and Hermann"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Willms - Ratke",
      "Hamill, Jones and Klein"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      152,
      67,
      200,
      162,
      170,
      80,
      69,
      188,
      95,
      64,
      6,
      194,
      95,
      92
    ],
    "last_login": "2024-10-29T11:18:06.691Z"
  },
  {
    "id": "3757654f-4bbd-4e9f-bab8-088dac57a621",
    "notificationName": "suggero",
    "triggerState": "running",
    "email": "Ronny_Schmidt91@gmail.com",
    "reoccurring": true,
    "creationDate": "2024-05-01T21:21:22.576Z",
    "lastRunDate": "2025-01-14T10:06:48.455Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Kreiger, Harber and Howe",
      "Kshlerin, Lindgren and Marks",
      "Dietrich - Gislason",
      "Casper and Sons",
      "Kuphal - Veum",
      "Dickens - Stoltenberg"
    ],
    "role": "Manager",
    "status": false,
    "companies": [
      "Rau LLC",
      "Wilderman, Hudson and Watsica",
      "Borer - Lueilwitz"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      82,
      118,
      151,
      14,
      106,
      88,
      152,
      123,
      83,
      200,
      85,
      200,
      27,
      46
    ],
    "last_login": "2024-01-23T17:37:03.974Z"
  },
  {
    "id": "6c9b0c84-7cf9-4abb-a802-63b693442104",
    "notificationName": "repellendus credo cogo",
    "triggerState": "waiting",
    "email": "Gene.Schroeder@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-03-27T09:26:48.678Z",
    "lastRunDate": "2025-01-14T14:18:33.508Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Davis LLC",
      "Macejkovic LLC",
      "Powlowski - Dibbert",
      "Haley, Gibson and Little",
      "Kovacek, Steuber and Dietrich",
      "Simonis Group",
      "Toy, Rohan and Marquardt",
      "Kunze - Blanda"
    ],
    "role": "Developer",
    "status": true,
    "companies": [
      "Kemmer, Blick and Rice",
      "Schamberger Inc",
      "Zemlak - Kuhlman",
      "Wiegand Group"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [],
    "last_login": "2024-12-16T01:56:52.635Z"
  },
  {
    "id": "59ba137a-4e23-4899-9dab-33a4a6056a3a",
    "notificationName": "denuncio amplus",
    "triggerState": "completed",
    "email": "Fleta.Harris35@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-06-28T11:18:14.563Z",
    "lastRunDate": "2025-01-15T03:43:57.590Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Okuneva - Price",
      "Morar, Lowe and Kuvalis",
      "Hyatt, Keeling and Franey",
      "Little, McCullough and Konopelski",
      "Robel - Crona",
      "Windler - Brakus",
      "Johnston, Mertz and Leannon"
    ],
    "role": "User",
    "status": true,
    "companies": [
      "Reichert, Tromp and Wiza",
      "Terry, Turner and Abshire",
      "Kub - Klein"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      129,
      126,
      63
    ],
    "last_login": "2024-12-23T15:00:05.601Z"
  },
  {
    "id": "09d94a1c-4a4b-41ec-9ff8-a715e0f8190a",
    "notificationName": "aliquid expedita asporto",
    "triggerState": "waiting",
    "email": "Misty55@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-12-02T18:01:01.160Z",
    "lastRunDate": "2025-01-15T00:46:37.746Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Terry, Renner and Cremin",
      "Prosacco Inc",
      "Erdman and Sons",
      "Rohan, Dietrich and O'Keefe",
      "Dach, DuBuque and Schaden",
      "Hamill, Farrell and Corwin",
      "O'Conner - Simonis"
    ],
    "role": "UX Designer",
    "status": true,
    "companies": [
      "Muller LLC",
      "Wiza, Bogisich and Cassin",
      "Goodwin Inc",
      "Mosciski, Kshlerin and Rowe"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      59,
      160,
      5,
      76,
      49,
      48,
      113,
      63
    ],
    "last_login": "2024-02-18T13:24:25.646Z"
  },
  {
    "id": "279aa14b-01f5-47e4-b95e-a8661699f167",
    "notificationName": "delego delectatio",
    "triggerState": "waiting",
    "email": "Ferne28@gmail.com",
    "reoccurring": false,
    "creationDate": "2024-02-28T04:19:48.770Z",
    "lastRunDate": "2025-01-15T01:11:02.633Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": true
    },
    "recipients": [
      "Emmerich, Kemmer and Huel",
      "Harber - Brown",
      "Heidenreich - Rohan",
      "Berge, Dietrich and Rath",
      "Schimmel and Sons",
      "Ankunding, Ryan and O'Reilly",
      "Green - Carroll",
      "Braun LLC"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Schowalter, Mills and Ortiz"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      164,
      125,
      105,
      132,
      112,
      126,
      28,
      103,
      67,
      59,
      55,
      23,
      55,
      157,
      12,
      123,
      48
    ],
    "last_login": "2024-06-04T13:54:13.590Z"
  },
  {
    "id": "e77f5ece-76cf-4713-af8b-7a781d457aa4",
    "notificationName": "iste appono",
    "triggerState": "running",
    "email": "Adelia.Doyle11@yahoo.com",
    "reoccurring": true,
    "creationDate": "2025-01-10T07:38:12.794Z",
    "lastRunDate": "2025-01-15T00:22:23.519Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Kutch - Stracke",
      "Fisher, Murphy and Hilpert",
      "Runolfsdottir Group",
      "Padberg - Johns",
      "Larkin, Trantow and Rippin",
      "Gibson, Moen and Willms",
      "Schoen - Beatty",
      "Kerluke - Kihn"
    ],
    "role": "Content Creator",
    "status": true,
    "companies": [
      "Johnston - Kutch"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      15,
      10,
      117,
      28,
      191,
      17,
      142,
      67,
      157,
      140,
      92,
      38,
      121,
      29,
      88,
      184,
      81,
      120
    ],
    "last_login": "2024-03-01T21:09:45.168Z"
  },
  {
    "id": "2fdebdd8-4d84-42ec-ae4a-a820c52f5717",
    "notificationName": "tricesimus ipsam turbo",
    "triggerState": "running",
    "email": "Ervin.Hyatt-Champlin@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-01-31T00:00:39.571Z",
    "lastRunDate": "2025-01-14T21:10:47.922Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Kirlin, Runte and Pollich",
      "Huel, Little and Pouros",
      "Marvin Group",
      "Crist - Cormier",
      "Wintheiser - Conroy",
      "Hegmann Group",
      "Nolan, Lockman and Lind"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Crona - Kub",
      "Mills, Morissette and Rutherford",
      "Sipes Inc"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      38,
      87,
      46,
      56,
      2,
      72
    ],
    "last_login": "2024-07-11T15:44:50.240Z"
  },
  {
    "id": "da91a813-e9e0-40c4-89a1-997950184de4",
    "notificationName": "viscus suadeo",
    "triggerState": "running",
    "email": "Ray.Quigley@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-05-30T10:28:42.692Z",
    "lastRunDate": "2025-01-14T16:58:15.268Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Hauck - Boyle",
      "Kihn - Christiansen",
      "Harris, Nader and Gutmann",
      "Hettinger Group",
      "Von - Heidenreich",
      "Gutmann LLC",
      "O'Conner LLC",
      "Schinner - Mraz",
      "Strosin - Altenwerth",
      "Armstrong, Howell and Roberts"
    ],
    "role": "Admin",
    "status": false,
    "companies": [
      "Nader and Sons"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      119,
      66,
      120,
      12,
      89,
      171,
      120,
      195
    ],
    "last_login": "2024-03-19T04:39:39.339Z"
  },
  {
    "id": "8d563a59-5e28-41b9-9bbe-75cd483dc6d7",
    "notificationName": "abstergo arcesso ultra",
    "triggerState": "completed",
    "email": "Noemi_Roob@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-10-05T13:33:25.835Z",
    "lastRunDate": "2025-01-15T02:50:13.961Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Volkman, Sawayn and Casper",
      "Little - Aufderhar",
      "Pfannerstill LLC",
      "Dooley, Mills and Nikolaus",
      "Pfannerstill, Bayer and Koelpin",
      "Gleason and Sons",
      "Flatley - Kuvalis",
      "Kshlerin, Strosin and Beer"
    ],
    "role": "User",
    "status": true,
    "companies": [
      "Collier - Reichel"
    ],
    "notification_seen": false,
    "login": true,
    "chartData": [
      10,
      87,
      139,
      21,
      43,
      164,
      85,
      13,
      158,
      34,
      31,
      55,
      25
    ],
    "last_login": "2024-09-10T10:19:04.853Z"
  },
  {
    "id": "68adccfb-5f10-43d0-9bed-40ddbba37e39",
    "notificationName": "virga depopulo",
    "triggerState": "running",
    "email": "Patricia_Wuckert93@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-09-20T00:33:56.059Z",
    "lastRunDate": "2025-01-14T13:17:44.708Z",
    "triggerType": "On-Demand",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": true
    },
    "recipients": [
      "Schroeder - Cremin",
      "Tillman Inc",
      "DuBuque - Feeney",
      "Beier, Hills and Deckow",
      "Johnston - Feil",
      "Harvey Inc"
    ],
    "role": "UX Designer",
    "status": false,
    "companies": [
      "Schaefer, Boehm and Mraz",
      "Murazik - Christiansen",
      "Schoen, Kulas and McGlynn",
      "Lang LLC"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      16,
      38,
      84,
      137,
      9,
      177,
      116,
      71,
      200,
      6,
      150,
      146,
      81,
      114,
      35
    ],
    "last_login": "2024-06-29T14:32:52.346Z"
  },
  {
    "id": "1df9d8a9-a3d4-4bd6-bc2a-d92e7561123b",
    "notificationName": "cilicium",
    "triggerState": "completed",
    "email": "Charles.Emard@yahoo.com",
    "reoccurring": false,
    "creationDate": "2024-04-24T05:29:36.021Z",
    "lastRunDate": "2025-01-14T13:55:54.168Z",
    "triggerType": "Time-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Turner Group",
      "Hagenes - White",
      "Kling - Crooks",
      "Kautzer, Quitzon and Towne",
      "Altenwerth Inc",
      "Carroll - Will",
      "Smitham - Padberg",
      "Crona, Koelpin and Hyatt",
      "Lesch LLC",
      "Cole - Wuckert"
    ],
    "role": "Developer",
    "status": false,
    "companies": [
      "Fisher - Greenfelder"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      80,
      23,
      136,
      50,
      119,
      170,
      120
    ],
    "last_login": "2024-12-13T03:15:09.975Z"
  },
  {
    "id": "e19da743-da8f-494c-99c5-0f3fee180018",
    "notificationName": "depraedor calamitas",
    "triggerState": "running",
    "email": "Werner.Mante7@yahoo.com",
    "reoccurring": true,
    "creationDate": "2024-09-06T15:23:48.935Z",
    "lastRunDate": "2025-01-15T03:57:15.311Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Luettgen LLC",
      "Cassin Group",
      "Graham Inc",
      "Nader LLC",
      "Nitzsche, Murphy and Schultz",
      "Kshlerin LLC",
      "Dooley, Auer and Hartmann",
      "Morar - Tillman"
    ],
    "role": "Admin",
    "status": true,
    "companies": [
      "Emmerich - Cummerata"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      58,
      177,
      182,
      17,
      44,
      147,
      66,
      167,
      26,
      142,
      181,
      82,
      105
    ],
    "last_login": "2024-08-11T04:57:33.527Z"
  },
  {
    "id": "cf4e7e4d-1c48-4e74-a74c-d72cd9b98766",
    "notificationName": "cognomen excepturi tempora",
    "triggerState": "waiting",
    "email": "Susan81@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-11-27T13:13:23.784Z",
    "lastRunDate": "2025-01-15T04:02:25.546Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": false,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Runolfsdottir, Bradtke and Gislason",
      "Yost - Franecki",
      "Reichert and Sons",
      "Yost - Gleichner",
      "Jacobs - Durgan",
      "Walsh, Bayer and Boyle",
      "Haley Inc",
      "Streich, Veum and Gleichner"
    ],
    "role": "Manager",
    "status": true,
    "companies": [
      "Ullrich and Sons",
      "Lindgren Inc",
      "King - Abernathy"
    ],
    "notification_seen": false,
    "login": false,
    "chartData": [
      26,
      128,
      22,
      74,
      112,
      56,
      187,
      64,
      133,
      139,
      153
    ],
    "last_login": "2024-04-06T02:57:27.340Z"
  },
  {
    "id": "b9a2ad6d-41ae-4085-a85e-8ce5a5ad13cf",
    "notificationName": "consequuntur audeo denego",
    "triggerState": "waiting",
    "email": "Tiffany.Bergstrom@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-07-18T19:04:13.510Z",
    "lastRunDate": "2025-01-14T07:01:18.946Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": false,
      "sms": false
    },
    "recipients": [
      "Fahey, Vandervort and Bednar",
      "Bruen, Wintheiser and Bayer",
      "Hirthe LLC",
      "Altenwerth LLC"
    ],
    "role": "Content Creator",
    "status": false,
    "companies": [
      "Roob Inc",
      "Roob, O'Keefe and Romaguera",
      "Dooley Group",
      "Bartoletti - Pagac"
    ],
    "notification_seen": true,
    "login": false,
    "chartData": [
      188,
      67,
      199,
      50,
      83,
      4,
      2,
      187,
      183
    ],
    "last_login": "2024-05-03T20:44:21.774Z"
  },
  {
    "id": "d0515cb9-7d9f-44d7-98b6-f7ad423aaf94",
    "notificationName": "patrocinor",
    "triggerState": "waiting",
    "email": "Margie62@hotmail.com",
    "reoccurring": false,
    "creationDate": "2024-11-17T12:32:52.951Z",
    "lastRunDate": "2025-01-14T07:44:16.625Z",
    "triggerType": "Event-Based",
    "deliveryMethod": {
      "inApp": true,
      "email": true,
      "sms": false
    },
    "recipients": [
      "Adams, D'Amore and Skiles",
      "Wolff, Collins and Kub",
      "Wisoky, Steuber and Stark",
      "Hegmann, Altenwerth and Koss",
      "Casper Group",
      "Beahan, Streich and Durgan"
    ],
    "role": "User",
    "status": false,
    "companies": [
      "Bayer - Flatley",
      "Macejkovic Group"
    ],
    "notification_seen": true,
    "login": true,
    "chartData": [
      53,
      179,
      5,
      10,
      200,
      111
    ],
    "last_login": "2024-07-26T23:56:46.360Z"
  }
]