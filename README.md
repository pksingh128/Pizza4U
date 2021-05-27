## Pizza Ordering and Real Time Tracking System
This is a web app ,where you can order pizzas online in more convenient way, and track its delivery just like email in real time.Now isn't that convenient.
Payment can be done using online mode or cash on delivery(COD)


## Home page
[![Home-page](https://github.com/pksingh128/pizza/blob/master/public/images/home.JPG)](https://www.youtube.com/watch?v=5_i6bY6iYtQ)
![Home-page](https://github.com/pksingh128/pizza/blob/master/public/images/menu.JPG)


# How it works
Details of how system works.
## Clients Side
- initially, you need to register with providing all the customer details,then customer can login to this website
- for login system i used *passport js* for all kind of authentications
- after login they can see all their orderd list of pizzas.
- now if customer wants to order new pizzas then go to menu section just click at add button they can add pizzas to the cart.
- after that can see billing of that pizzas and now they can pay cash on delivery or online .in this project we use *stripe* for online payment.
- so, by selecting mode of payment, customers placed order in just one click. 
- after that customer gets an email confirmation for orders with order summary. for emails i use *nodemailer* here.
- now customer can see list of **ordered pizzas** here, simply *click* on **order id** of pizza they can track the status of orderd pizza.
## Admin Side
- admin has also a fix username and password.
- after login by username and password admin can see all the list of orders pizza placed by customers.
- here admin can change the status of ordered pizzas and it is reflected at the clint side in real time for this i have used *socket io*.
- admin can also edit and update menu of pizzas .



## Project Setup
Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.
#

### 1.) Install MYSQL.

 To run this project, you need to install the latest version of MYSQL Community Edition first. (Once installed make sure it running properly.)
   * https://dev.mysql.com/downloads/mysql/<br/>

### 2.) Clone the repository.
```bash
git clone https://github.com/pksingh128/pizza.git
```

### 3.) Change directory.
```bash
cd pizza
```

### 4.) Install Dependencies
```bash
npm install
```

### 5.) Setting .env file

- *.sample-env* file in source code repository, This sample file would list all the environment variables 
- used by project,  for example :
- HOST =" "  
- PORT =" "
                               
 
- now just after cloning the repository, copy the *.sample-env* file into a new *.env* file and fill the values.                
                


### 6.) Start the Server.
```bash
npm start
```
This will launch the Node server on port 5000. If that port is busy, you can set a different port in the server.js (Eg: PORT=5000)

Open up your browser and head over to:

* http://localhost:5000/

## Project Demo
https://www.youtube.com/watch?v=5_i6bY6iYtQ

