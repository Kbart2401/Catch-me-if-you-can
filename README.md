![logo](./frontend/src/images/logo.png)
<h1 align='center'>Catch Me If You Can Documentation</h1>

<div align='center'>Built with 
<br>
<img src="https://img.icons8.com/color/48/000000/javascript.png"/>
<img src="https://img.icons8.com/color/48/000000/python.png"/>
<img src="https://img.icons8.com/officel/40/000000/react.png"/>
<img src="https://img.icons8.com/color/48/000000/redux.png"/>
<img src="https://img.icons8.com/color/48/000000/postgreesql.png"/>
</div>
<div align='center'>By
<br>
<a href='https://www.linkedin.com/in/aaron-hanson-brb/'>Aaron Hanson</a>
<a href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'>Kyle Barthelmes </a>
<a href='https://www.linkedin.com/in/nicholas-richard-77a9a066/'>Nick Richard</a>
<a href='https://www.linkedin.com/in/rhysprevite/'>Rhys Previte</a>
</div>
<br>
<div align='center' style='font-size: 25px'>
<a href='https://catch-me-if-you-cann.herokuapp.com/'>Live Link</a>
</div>


## Summary
Catch Me If You Can is a fun, competitive app that lets you create and track routes that you've walked, biked or ran. Add friends ("rivals") and they can track their own times on your route. Each route has a leaderboard to see who has the fastest time!

## Features
### Modern interactive landing page
- Includes several items on the page that change according to user interaction

![Screen Shot 2021-02-08 at 10 50 08 AM](https://user-images.githubusercontent.com/67812737/107246216-0451a000-69fe-11eb-993c-c1cfed9bbeb4.png)

### Interactive map using © MapBox api 
  - Create routes using markers for start and finish of a route

  ![Screen Shot 2021-02-08 at 10 52 33 AM](https://user-images.githubusercontent.com/67812737/107245486-34e50a00-69fd-11eb-80a5-5467e77754af.png)


  - Search for beginning points of routes within a certain radius using the app's Find a Route feature

![Screen Shot 2021-02-08 at 10 57 43 AM](https://user-images.githubusercontent.com/67812737/107245686-6c53b680-69fd-11eb-8a5a-e27854959ef1.png)

### Dashboard that tracks several key metrics
  - Most recent route's time to completion and distance
  - Total distance along routes
  - Total time on routes
  - Total calories burned

  ![Screen Shot 2021-02-08 at 10 51 14 AM](https://user-images.githubusercontent.com/67812737/107245737-7d042c80-69fd-11eb-99b9-2ee1fea2c94f.png)

### Community page with the following features
  - Search for other users ("rivals") and add them to your community
  - See community members' profile and dashboard

  ![Screen Shot 2021-02-08 at 10 59 16 AM](https://user-images.githubusercontent.com/67812737/107245934-b5a40600-69fd-11eb-81fe-9c8f375b6e69.png)

### Fun animated 404 page
![Screen Shot 2021-02-08 at 10 59 44 AM](https://user-images.githubusercontent.com/67812737/107246394-3531d500-69fe-11eb-85c4-ad2cd0ea96ee.png)

### View all the personal routes you've added and view their leaderboards
![Screen Shot 2021-02-08 at 11 12 02 AM](https://user-images.githubusercontent.com/67812737/107246729-8b9f1380-69fe-11eb-99b3-cf93fc607692.png)
<br>

# Database Schema
<img width="1458" alt="Screen Shot 2021-02-08 at 11 32 37 AM" src="https://user-images.githubusercontent.com/67812737/107249485-6c55b580-6a01-11eb-83f5-9a13447b47ea.png">
<br />
<br />

# Usage 

## Demo User
There is a **Demo** login that allows access to the site. However, the Demo User Login does **NOT** use your geolocation, but instead uses a hard-coded latitude and longitude. If you would like to see routes in your local area, either manually navigate to your region or sign up for the site to get instant data on your area.

## Contribution
If you would like to contribute to this project in any way, you may take the following steps
  1. Fork this repository
  2. Locally create a new branch `git checkout -b <new branch name>`
  3. Make updates and push branch up to repo `git push -u origin <new branch name>`
  4. Create a pull request
    - Please include clear details of changes 
  
  ### Reporting bugs
  Please report any bugs/issues you may find via opening an issue in this repo

  ## Development
  Follow these steps if you need guidance on setting up and running a local server for this project
  1. Clone or fork this repo
  2. **cd** into **backend** and run `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
  3. **cd** into **frontend** and run `npm install`
  4. Create a **.env** file in both the **frontend** and **backend** and follow the **.env.example** files
  5. Create a postgresql database according to the `DATABASE_URL` in **.env.example**
  6. Start your Flask app from **backend** with `pipenv run flask run`
  7. Start your React app from **frontend** with `npm start`
  - Server will be on **http://localhost:3000/**

