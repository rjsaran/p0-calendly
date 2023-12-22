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

`sh
https://calendly-ec16681f4e77.herokuapp.com
`

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
      "weekDay": 0
    },
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
      "weekDay": 0
    },
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
      "weekDay": 0
    },
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

#### 6. Find overlap intervals between multiple users

```http
POST /v1/schedule/findOverlap
```

Request Body:

userIds: Ids of user

```json
{
  "userIds": ["usr_202312221339245673", "usr_202312221339245674"]
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

#### 7. Update availability by id

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
      "weekDay": 0
    },
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
      "weekDay": 0
    },
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
