# Naija Farmers
A book review web API

# Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
	- [Register](#register)
	- [Login](#login)
	- [Confirm Token](#confirm_token)
    - [Permissions](#permissions)



## Installation

```
clone the repository

create .env and paste the content of .env sample into it

run npm install
run migration: npm run createTable
seed database: npm run seedDB
start application: npm run dev:start
```

## Endpoints

### Register: Register a user

#### Request
`Post api/v1/auth/register`

#### Body
{
	"email": "esiaguleticia@gmail.com",
	"username": "mezlet",
	"password": "iamkeli001",
	"group_id": "2",
	"role_id": "1",
	"permissions": ["2", "4"]
}

####  Response
```
{
    "succes": true,
    "user": {
        "id": 1,
        "username": "mezlet",
        "email": "esiaguleticia@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsZXR0eSIsImlhdCI6MTU3MDU4Nzc5OSwiZXhwIjoxNTcxMTkyNTk5fQ.ZYqpqg1k1OoN8dn2OIaCmqdWgQpT84oGfiA-s42bGN0"
    }
}

```

### Login: User login

#### Request
`Post api/v1/auth/login/`

#### Body
{
	"email":"esiaguleticia@gmail.com",
	"password":"iamkeli002"
}

####  Response
```
{
    "succes": true,
    "user": {
        "id": 1,
        "username": "mezlet",
        "email": "esiaguleticia@gmail.com",
        "role_name": "Super Admin",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsZXR0eSIsImlhdCI6MTU3MDU4Nzc5OSwiZXhwIjoxNTcxMTkyNTk5fQ.ZYqpqg1k1OoN8dn2OIaCmqdWgQpT84oGfiA-s42bGN0"
    }
}

```

### Confirm Tokem

#### Request
`GET /api/v1/auth/confirmation?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsZXR0eSIsImlhdCI6MTU3MDU4Nzc5OSwiZXhwIjoxNTcxMTkyNTk5fQ.ZYqpqg1k1OoN8dn2OIaCmqdWgQpT84oGfiA-s42bGN0`

#### Response
```
{
status: 200,
data: {
id: 104,
username: "mezlet",
email: "esiaguleticia@gmail.com",
is_confirmed: true
}
}

```

### Permissions

#### Request
`GET api/v1/auth/permissions?email=esiaguleticia@gmail.com`

####  Response
```
{
    "status": 200,
    "data": {
        "username": "letty",
        "email": "letty@gmail.com",
        "permissions": [
            "create master agents",
            "create village agent",
            "create farmers",
            "create editor",
            "create super admin"
        ],
        "group_name": "master-agent",
        "role_name": "Super Admin"
    }
}
```

