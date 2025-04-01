#  Description

This project is to register a new user into the system and while login the user it route to a home with a welcome message with a middleware authenticator

# Tech used

Nodejs, postman

# Postman API for testing

1. https://userlogin-node.onrender.com/users/register - POST
   Input -{
    "name": " ",
    "email": "",
    "password": ""
}

2. https://userlogin-node.onrender.com/users/login - POST
   Input -{
    "email": "",
    "password": ""
}

3. https://userlogin-node.onrender.com/home - GET
