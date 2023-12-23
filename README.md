# Harbor Take Home Project

Welcome to the Harbor take home project. We hope this is a good opportunity for you to showcase your skills.

## The Challenge

Build us a REST API for calendly. Remember to support

- Setting own availability
- Showing own availability
- Finding overlap in schedule between 2 users

It is up to you what else to support.

## Expectations

We care about

- Have you thought through what a good MVP looks like? Does your API support that?
- What trade-offs are you making in your design?
- Working code - we should be able to pull and hit the code locally. Bonus points if deployed somewhere.
- Any good engineer will make hacks when necessary - what are your hacks and why?

We don't care about

- Authentication
- UI
- Perfection - good and working quickly is better

It is up to you how much time you want to spend on this project. There are likely diminishing returns as the time spent goes up.

## Submission

Please fork this repository and reach out to Prakash when finished.

## Next Steps

After submission, we will conduct a 30 to 60 minute code review in person. We will ask you about your thinking and design choices.

# Solution

## How to run application

### Local Environment:

#### a. Clone git repo

```sh
git clone https://github.com/rjsaran/p0-calendly.git
```

#### b. If docker is available, Run below steps

```sh
docker-compose build

docker-compose up
```

#### c. If docker is not installed, Run

```sh
npm install

npm run build

node run start
```

## How to test APIs

Local Host:

```sh
http://127.0.0.1:3000
```

Heroku Host:

```sh
https://calendly-ec16681f4e77.herokuapp.com
```

## Assumptions/Limitations:

1. **Absence of Timezone Support**: Timezone support has not been implemented; the assumption is that all users are in a unified timezone.

2. **Data Persistence Note**: Data persistence is currently unavailable; an in-memory repository is being utilized at the moment.

3. **Absence of API Validations**: No API validations are in place; it is assumed that the client will send the data in the expected format.

4. **Support for multiple availability options**: While users have the ability to create multiple availability options, the application defaults to using only the first option while finding overlap.

5. **Overlap Finder**: The overlap finder operates in two modes: week and month. For example, in month mode, the API will provide all overlapping intervals between two users within the current month.

6. **Time format**: Uses 24-hour time format; there is no AM/PM notation.

7. **Week/Date availability**: The week availability parameter is utilized to set intervals for specific days of the week. The date availability parameter can override the week availability settings, and both parameters share the same data structure.

For example, Raam is available on all weekdays from 09:00 AM to 05:00 PM and only available from 04:00 PM to 05:00 PM on January 1, 2024.

Weekly Configuration:

```json
[
  {
    "intervals": [
      {
        "from": "09:00",
        "to": "17:00"
      }
    ],
    "weekDay": 1
  },
  {
    "intervals": [
      {
        "from": "09:00",
        "to": "17:00"
      }
    ],
    "weekDay": 2
  },
  {
    "intervals": [
      {
        "from": "09:00",
        "to": "17:00"
      }
    ],
    "weekDay": 3
  },
  {
    "intervals": [
      {
        "from": "09:00",
        "to": "17:00"
      }
    ],
    "weekDay": 4
  },
  {
    "intervals": [
      {
        "from": "09:00",
        "to": "17:00"
      }
    ],
    "weekDay": 5
  }
]
```

Here, weekDay represents the day of the week, where 1 is Monday, 2 is Tuesday, and so on, with 7 being Sunday.

Date Configuration for 1 Jan 2024:

```json
[
  {
    "intervals": [
      {
        "from": "16:00",
        "to": "17:00"
      }
    ],
    "date": "2024-01-01"
  }
]
```

While calculating availability for a particular day, date-specific intervals will take precedence.

## Project Structure

.

- [dist](./dist) - Build

- [src](./src) - Source code

  - [http](./src/http)
    - [exception](./src/http/exception) - HTTP Exception, Request Error Handler
    - [server](./src/http/server) - Express Server, Base Router
  - [module](./src/module/) - Contains core components of application

    - [availability](./src/module/availability) - Set, Show, Update availability
      - [controller](./src/module/availability/controller)
      - [model](./src/module/availability/model) - Domain, Classes
      - [repository](./src/module/availability/repository) - Database intrection
      - [service](./src/module/availability/service) - Core business logic
    - [schedule](./src/module/schedule) - Find overlap b/w users availability
      - [controller](./src/module/schedule/controller)
      - [model](./src/module/schedule/model)
      - [service](./src/module/schedule/service)
    - [user](./src/module/user) - Create, Read, user
      - [controller](./src/module/user/controller)
      - [model](./src/module/user/model)
      - [repository](./src/module/user/repository)
      - [service](./src/module/user/service)

  - [utils](./src/utils) - Random, ID Generator, Overlap finder algoritm

## APIs

#### 1. Create new user

```http
POST /v1/user
```

Request Body:

```json
{
  "name": "Ramjeet Saran",
  "email": "saran.ramjeet@gmail.com"
}
```

Response Body:

```json
{
  "id": "usr_202312221339245673",
  "name": "Ramjeet Saran",
  "email": "saran.ramjeet@gmail.com"
}
```

#### 2. Get user details by id

```http
GET /v1/user/usr_202312221339245673
```

Response Body:

```json
{
  "id": "usr_202312221339245673",
  "name": "Ramjeet Saran",
  "email": "saran.ramjeet@gmail.com"
}
```

#### 3. Get all users

```http
GET /v1/user
```

Response Body:

```json
{
  "paging": {
    "count": 1,
    "nextCursor": null
  },
  "data": [
    {
      "id": "usr_202312222110558965",
      "name": "Ramjeet Saran",
      "email": "saran.ramjeet@gmail.com"
    }
  ]
}
```

#### 4. Create availability for a user

```http
POST /v1/availability
```

Request Body:

name: Name

userId: Id of user

week: List of week specific availability

date: List of date specific availability, overrides week availability

```json
{
  "name": "Default",
  "userId": "usr_202312221339245673",
  "week": [
    {
      "intervals": [
        {
          "from": "10:00",
          "to": "14:00"
        }
      ],
      "weekDay": 1
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 2
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 3
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 4
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 5
    }
  ],
  "date": [
    {
      "date": "2023-12-22",
      "intervals": [
        {
          "from": "12:00",
          "to": "13:00"
        },
        {
          "from": "18:00",
          "to": "19:00"
        }
      ]
    }
  ]
}
```

Response Body:

```json
{
  "id": "avl_202312222251339338",
  "name": "Default",
  "userId": "usr_202312221339245673",
  "week": [
    {
      "intervals": [
        {
          "from": "10:00",
          "to": "12:00"
        }
      ],
      "weekDay": 1
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 2
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 3
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 4
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 5
    }
  ],
  "date": [
    {
      "date": "2023-12-22",
      "intervals": [
        {
          "from": "12:00",
          "to": "13:00"
        },
        {
          "from": "18:00",
          "to": "19:00"
        }
      ]
    }
  ]
}
```

#### 5. Get availability by id

```http
GET /v1/availability/avl_202312222251339338
```

Response Body:

```json
{
  "id": "avl_202312222251339338",
  "name": "Default",
  "userId": "usr_202312221339245673",
  "week": [
    {
      "intervals": [
        {
          "from": "10:00",
          "to": "14:00"
        }
      ],
      "weekDay": 1
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 2
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 3
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 4
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 5
    }
  ],
  "date": [
    {
      "intervals": [
        {
          "from": "12:00",
          "to": "13:00"
        },
        {
          "from": "18:00",
          "to": "19:00"
        }
      ],
      "date": "2023-12-22"
    }
  ]
}
```

#### 6. Get availability for a user

```http
GET /v1/availability/user/usr_202312221339245673
```

Response Body:

```json
{
  "id": "avl_202312222251339338",
  "name": "Default",
  "userId": "usr_202312221339245673",
  "week": [
    {
      "intervals": [
        {
          "from": "10:00",
          "to": "14:00"
        }
      ],
      "weekDay": 1
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 2
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 3
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 4
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 5
    }
  ],
  "date": [
    {
      "intervals": [
        {
          "from": "12:00",
          "to": "13:00"
        },
        {
          "from": "18:00",
          "to": "19:00"
        }
      ],
      "date": "2023-12-22"
    }
  ]
}
```

#### 7. Find overlap intervals between multiple users

```http
POST /v1/schedule/findOverlap
```

Request Body:

userIds: Ids of user

```json
{
  "userIds": ["usr_202312221339245673", "usr_202312221339245674"],
  "type": "monthly"
}
```

Response Body:

```json
{
  "paging": {
    "count": 7,
    "nextCursor": null
  },
  "data": [
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "date": "2023-12-18"
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "date": "2023-12-19"
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "date": "2023-12-20"
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "date": "2023-12-21"
    },
    {
      "intervals": [
        {
          "from": "12:00",
          "to": "13:00"
        },
        {
          "from": "18:00",
          "to": "19:00"
        }
      ],
      "date": "2023-12-22"
    },
    {
      "intervals": [],
      "date": "2023-12-23"
    },
    {
      "intervals": [
        {
          "from": "10:00",
          "to": "14:00"
        }
      ],
      "date": "2023-12-24"
    }
  ]
}
```

#### 8. Update availability by id

```http
PUT /v1/availability/avl_202312222251339338
```

Request Body:

```json
{
  "name": "Default",
  "week": [
    {
      "intervals": [
        {
          "from": "10:00",
          "to": "14:00"
        }
      ],
      "weekDay": 1
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 2
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 3
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 4
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 5
    }
  ],
  "date": [
    {
      "date": "2023-12-22",
      "intervals": [
        {
          "from": "12:00",
          "to": "13:00"
        },
        {
          "from": "18:00",
          "to": "19:00"
        }
      ]
    }
  ]
}
```

Response Body:

```json
{
  "id": "avl_202312222251339338",
  "name": "Default",
  "userId": "usr_202312221339245673",
  "week": [
    {
      "intervals": [
        {
          "from": "10:00",
          "to": "12:00"
        }
      ],
      "weekDay": 1
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 2
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 3
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 4
    },
    {
      "intervals": [
        {
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "weekDay": 5
    }
  ],
  "date": [
    {
      "date": "2023-12-22",
      "intervals": [
        {
          "from": "12:00",
          "to": "13:00"
        },
        {
          "from": "18:00",
          "to": "19:00"
        }
      ]
    }
  ]
}
```
