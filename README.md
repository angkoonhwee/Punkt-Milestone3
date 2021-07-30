# **Milestone 3 README - Punkt**

[TOC]



## **Proposed Level of Achievement**

Project Gemini

## **Poster**

https://www.canva.com/design/DAEdhaS2nR4/roGHPETaF_tcvYcu0nskgw/view?utm_content=DAEdhaS2nR4&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

## **Video**

https://drive.google.com/file/d/1l803ijBGdmbhO8nqqqm8hTfWFhuhAIpb/view?usp=sharing 

## **Project Introduction**

### Aim

**We hope to motivate students to be more focused when they are studying through the use of our online application. **

### User Stories

As a student who often procrastinates, I would like to have a buddy who can motivate me to study and get my work done.As a student who often encounters questions when studying, I would like to have a buddy or a group chat system where people are able to answer my doubts.As a student who often feels like normal daily work has little to no stakes and hence not completing them, I would like to have some external pressure that would have immediate effects to motivate me to work.

### How our app differs from existing apps

We picked existing applications that are popular and those that we have tried before to make a comparison.

<u>Case study 1: Forest</u>

Forest is used mainly to keep track of the amount of time spent on studying, working, exercising and etc depending on users’ usage, while keeping users’ phone away from them. However, for the iOS version, as the app cannot override the system (so as to disallow users to use other apps), users can still use other apps while planting their trees. This defeats the purpose of having such a tracker to keep one focused and increase his/her productivity. 

Our web application aims to mitigate this problem by getting users to set their goals (a todo list) to be completed everyday and pairing them with another user (buddy) who will verify their progress at the end of the day. In addition, users are encouraged to post their goals on the community page. This increases users’ sense of urgency and accountability to accomplish their goals. 



<u>Case study 2: Study Bunny</u>

The core feature of Study Bunny is the concept of a virtual pet. The in-game currency is used to purchase food, accessories and toys for the virtual bunny and one can keep track of the happiness and health of the bunny. In-game currency is earned through the amount of time focused, it acts as a timer and stops one from using applications that are set as distracting. Additionally, there are other optional tools for the app to act as a more detailed study tracker.

The main difference between Study Bunny and our project is that we make users invested in studying by increasing the stakes of not completing a study session. Emotional attachment towards a virtual pet is rarely sufficient to make one invested in studying for long periods of time since a virtual pet does not actually affect one’s life directly. Our application instead makes users invested by raising the stakes of fulfilling their study session through forfeiting and they would be held accountable by all the other users in the application. 

Secondly, Study Bunny is not a social application, which makes studying feel more isolated. Our application solves this problem by forming a community where users can encourage or challenge each other. The peer pressure is also useful in raising the stakes of studying.

## **User Guide**

https://drive.google.com/file/d/1CyTCvaEEmKo-PfZzisGhwUEP60Id17tT/view?usp=sharing 

## **Code Base**

https://github.com/angkoonhwee/Punkt-Milestone3 

## **Deployments**

==Note: **Please wait for 3s after every action** due to the relatively long request time for Heroku Server to send back the updated data.== 

Frontend: https://punkt-orbital.netlify.app/

Backend: https://punkt-server.herokuapp.com (not for user testing, solely for our own convenience of testing backend server functionalities)

Following Goalie’s feedback, we have added the following sample accounts for more convenient testing of buddy features. If you would like to test the functionality of sending buddy requests, you may create your own account as well.

<u>Sample Accounts:</u>

- Email: godcloud@gmail.com
- Email: godhwee@gmail.com
- Password: Test123

## **TechStack (MERN)**

- MongoDB (+ Mongoose)
- Firebase (for uploading of images)
- Nodejs + Express
- React, Redux

## **Developer Guide**

### Requirement Gathering

We used Observation, Brainstorming and Survey for Requirement Gathering. 

<u>Observation</u>

Many average students (including we the developer team of Punkt) find themselves procrastinating about school work or studying. In such a state it is hard for one to focus and make the best use of their time resulting in even more average scores, forming a vicious cycle of mediocrity. Our application is targeted towards students that want to study but simply do not have enough self-discipline and stamina to do so. Most such students have the desire to change but not the will to do so and we believe that with a little external push and higher stakes in their study, we can lift students out of this dire state. 

<u>Brainstorming</u>

Sometimes we procrastinate as we are only accountable to ourselves or when we hit a deadend in school work. Our online application solves this through pairing students taking the same module, majors or simply areas of interests together for study sessions to increase their sense of accountability and camaraderie (especially in times of COVID when social gathering is limited and most lessons are online). 

Furthermore, to increase student’s productivity, we are implementing a betting system to ensure that the student stays focused and completes their work on time. This would increase the stakes of studying and completing their goals.

A Leaderboard system (according to productivity) would be implemented to better match a student’s needs when they are considering which user they should choose as his/her buddy.

<u>Survey</u>

As this is our first time doing a software development project, we lack the foresight to survey our target audience in the very first Brainstorming stage. To make up for this, we surveyed users who were gathered to do user acceptance testing how often they procrastinate and if they need an application to help them reduce procrastination. Our survey result shows that about 75% of surveyed users agree/strongly agree that they do procrastinate often and want to have an application to help them reduce procrastination. (Note that due to the small sample, this data result may be inaccurate)

### Planning

We chose to develop a **Web Application** since they are more flexible in both implementation and usability. Web Application allows a wider user base regardless of the system they are using it in and is also easier to maintain without the need to cater to the updates of the mobile systems. 

In the following sections, we would like to introduce our process in developing Punkt from wireframing, organising React components to Database Model Design.

#### <u>Features Design</u> 

The **Betting system** provides a platform for user A to state his/her long term goal for a minimum of 3 days). The other students would be able to see this goal after user A creates his/her first post for this goal and bet on student A's ability to achieve his or her goals by the end of the time period. 

If user A is able to achieve his/her goal by the end of the stated period, he/she will get an increment in his/her productivity points depending on the number of users who bet against this goal. Else, the goal will be considered a failed goal and the user will have to create an atonement post. 

Initially, we wanted to use monetary transactions for our betting system. As our project develops, we realised that our application’s security system is immature and could lead to consequences that would be too ghastly to contemplate if we were to implement the betting system with actual monetary transactions. As a result, we decided to change the “punishment” for a failed goal from monetary losses to a forfeit that the user can set for himself/herself (known as atonement in our application).



A **Buddy system** will allow users to choose their desired buddy. They can make an informed decision through the leaderboard to see which users are more productive and thereby requesting those high ranking users. The buddy system allows users to track each other’s micro-progresses throughout the day using the functionalities of daily todos and live chat. Each buddy pair lasts for 30 days starting from the day the user accepts the request.



A **Leaderboard system** will rank users based on their productivity points. The more the user’s productivity points, the higher his/her rank.



#### <u>Website Design</u> 

We believe that User Interface and User Experience (UI/UX) is a crucial part to increase the usefulness and popularity of our web application. Therefore, we have carefully thought through our web design and user interfaces before starting to code our frontend UI. The following parts demonstrate our initial planning of the UI of our application.



**Overview/Wireframe:**

Our [Wireframe](https://wu617807.invisionapp.com/freehand/Orbital-Wireframe-v1-uwNyD50WC) shows a sketch of the different pages our application has and how the different pages are connected to each other through interfaces (e.g. clicking on one component leads to another page or component). Note that as this wireframe is a basic sketch of our application, it does not represent the UI of our application’s frontend with 100% accuracy since some of the designs have changed over time.
Component Diagram - ReactWe put together a React components tree diagram to better show our web application structure - how our different pages are divided into components and their interconnections. Such a component diagram also helps us in tracking our progress - if functional requirements have been covered by planned development. This component diagram also becomes more important as our system becomes more complex as we might forget some nitty gritty details in the process of coding.



**React Component Tree Diagram:**

[React components flow chart](https://docs.google.com/drawings/d/1_RL5d2lkBZpRXvNM4zH4zr-XCr-ik8KXI1-Kd21RRF8/edit?usp=sharing) 

As we have added more functionalities to our web application as of Milestone 3, our component tree has become much more complex and it is infeasible to show all the components, the above component tree is a simplified version of our frontend structure. We hope that, by providing the simplified component tree diagram, we will be able to give readers an intuitive understanding of the kind of structure we have while coding the frontend User Interface. 												



#### <u>Database Model Design</u>

We use a non-relational database (MongoDB) as database expansion is more flexible and has multiple data structures (e.g. number, strings, photo, video, message histories). 
In addition, some user information (e.g. user bio, social media, education background) are not required when they first signed up for the application, using a non-relational database allows these information to be added more easily without the need to restructure the data table in the developmental stage.![img](https://lh4.googleusercontent.com/DinbihUlYP1j5dOEzDkD8JaR4y8M8_t98Bidl7fEKrKvZbJnKVgjFEKh_SluMWzYSr3fbvtyLk_dR7aHvb5-quu8b3jN_hZ6-gI7Ydgn2pTiPcSVQ7mKXbqhYlR6cIbUqeWZt0X4)

<div align="center"><em>Fig 1.1. User information for a newly signed-up user</em></div>

![img](https://lh5.googleusercontent.com/cgOr6YhQQ8WnHlwB-MgRVyLN10WKdXXrPwT9tt-l_44ELCAo0ZvC8z2WPsbOW6vY_YipDNhwb6oE7jk75L4k9wtDZobfAoLUyYv_KfyI5Cy374FEW3GCrNMAwUlR22BNVAMwGVEy) 

<div align="center"><em>Fig 1.2. User information with more details filled, resulting in more fields in the user database</em></div>



**Denormalized Models**

 Denormalized models are schemas with embedded related data in a single structure or document. With MongoDB, our application can store related pieces of information in the same database record, thereby reducing the number of queries and updates needed.
For example, our User model has a “social” field which is an Object that stores the user’s school, major, year of study and current modules. Using MongoDB allows us to query for the needed data more easily using the dot notation (e.g. user.education.school). ![img](https://lh6.googleusercontent.com/hqFaE3-kjXlSwvokKr3V_4KU_0OO3NmBUx-1fwDjutg1za8VlV5FVkT5NLmWPMuRQpKWhIu08xHGdl8bHjBmOYzDh8Bu27wgp0OHLTE8qpI16HIYK5RJzg5xnNhKJp3qcbFpOz3v)



**Normalized Models**

Normalized Models describe relationships between documents using references. Normalized data models are generally used when the data to be embedded is more complicated, causing duplication of data which slows down read performance advantages.

For example, each of our users will have histories of their goals, bets and buddies. It is infeasible to store all these documents as embedded data in our user model. Therefore, the respective IDs of these goals, bets and buddies are used as reference IDs for faster reading and queries of data on our server side. 



**Database Design Diagram:**

[Database Design Diagram](https://docs.google.com/drawings/d/1_udBpTyz7SFZWPZ_vm1euxe6rbgiym9oUAfWL1TrWHg/edit?usp=sharing) 
The above database design diagram seeks to give readers a better idea what kind of fields we have in our models.

In our database design diagram, there are arrows pointing from one model to another to depict which fields from one model are used for another model. For instance, an arrow labeled with “userId'' pointing from the User model to the Goal model represents that ID of the user is referenced as “userId” in the goal.
The key takeaway from our database design diagram is that User, Goal and Buddy are our base models, while Post, Comment, Report, Request, Chat are extended models leveraging on information from these base models. 

One example is the request model which leverages on both the Buddy and User models. 
At any point in time 1 user can only have 1 request object stored onto it while a user can be simultaneously requested by many and hence having an array of request objects stored in requestedby field. The request object would include sender’s and receiver’s information to allow both sender and receiver to keep track of the request details - sender would know when the receiver accepts their request and receiver would also know who has requested to be their buddy. 

As for leveraging on Buddy, once a user accepts a request, 2 buddy objects must be added onto the Buddy collections for both the receiver and the sender. Furthermore, a chat object must be created and stored in the both Buddy objects. This allows the buddy system to be unlocked and start functioning.



**Details on Models**

<u>User</u>

- Username (unique): identifies the user with their customised namesEmail (unique): identifies the user with their email. 
- Email addresses are also needed to send users reset password token and link.
- Profile Picture, Cover Picture, Bio and fields where users can demonstrate their individuality and separate themselves from others.
- Education (includes school, major, year of study and current modules): used to help users identify users with common backgrounds as a factor of consideration for buddy pairing.
- Social (includes 3 commonly used social media - Instagram, LinkedIn, Github): allows users to connect with their buddy in the long term by following their other social media.
- Bet History: an array of Goal IDs to include all the bets that the user has participated in which have either been completed successfully or failed.
- Bet Against: an array of Goal IDs to include all the bets that the user has participated in which are still in progress.
- Followings: an array of User IDs to include all the users whom this particular user is following.
- Followers: an array of User IDs to include all the users who followed this particular user.
- Productivity Points: 
  - An indication of the user’s productivity level - how productive him/her is at achieving his/her stated goals. 
  - Used to rank the users for leaderboard positions
- Goal ID: 
  - refers to the user’s current goal. 
  - A user can only have a maximum of one goal at any given time.
  - Goal ID field will be cleared when a goal has been completed successfully or failed.
  - When this field is empty, the user will be allowed to create a new long term goal.
- Goal History: an array of Goal IDs to include all of the user’s current as well as past goals.
- Current Buddy: 
  - Refers to the user’s current buddy.
  - A user can only have a maximum of one buddy at any given time.
  - This field will be clear after the 30 days limit for a buddy pair and both users of the buddy pair will be able to request for a new buddy.
- Request: If the user has made a buddy request, this field will show the Request ID of the request made. 
- Requested By: an array of Request IDs to include all the buddy requests made to this user.
- Reset Password Token: 
  - A string token will be created for this field when the user requests for a password reset at Forgot Password Page.
  - This field is cleared once the user has reset his/her password.
  - If this field is empty, the user will not be allowed to reset his/her password
- Reset Password Expires: 
  - Date object created that is 20 minutes from the time reset password request is sent by the user
  - If a user sends a reset password request at Reset Password Page at a time that is later than the date in this field, the reset request will be rejected by the back end and the user might need to send a reset password request from Forgot Password Page.



<u>Goal</u>

- User ID: used to identify the user who created the goal.
- Title: title of the goal.
- Atonement: forfeit if the user is unable to complete the goal successfully.
- numDays: how long does this goal lasts for
- postIds: an array of Post ID strings as a compilation of all the posts that have been created for recording the progress of this goal.
- usersBetAgainst: an array of User ID strings to include all the users who have bet against this goal.
- Status: the current status of the goal. This field can be of any of the following three states: 
  - “In Progress”: the goal is currently in progress.
  - “Success”: the goal creator has meticulously recorded a post to show his/her progress every day for the stated number of days.
  - “Failed”: the goal creator did not record a post to show his/her progress a day within the stated number of days.
- madeAtonement: If the user has failed the goal, he/she has to make an atonement post. Once an atonement post has been created, this field will be set to true.
- Failed Messages: an array of objects to include users who bet against this goal’s messages replied to the goal creator after the goal has failed.



<u>Post</u>

- User ID: used to identify the user who created this post.
- Username: used to identify the user who created this post.Post ID: used to identify the goal that this post belongs to.
- Desc: the description of the post as recorded by the user.
- Img: an array of URL strings retrieved from Firebase to locate the images that the post creator has uploaded. A limit of a maximum of 6 URL strings has been imposed.
- Comments: an array of Comment IDs to include all the comments made under this post.
- Atonement: true if this is an atonement post, false otherwise.



<u>Comment</u>

- User ID: used to identify which user created this comment.
- Post ID: used to identify which post this comment belongs to.
- Content: the description that the user has inputted in the comment component.
- Likes: an array of user IDs to include the users which have liked this comment.



<u>Report</u>

- reportedBy: user ID of the user who reported this post.
- ReportedAgainst: userID of the user who created this post.postId: used to identify the post that has been reported.
- Reason: reason for the reportedBy user to report this post.isSettled: false by default, the developer team may change this field to true if the issue has been looked through and actions have been taken.



<u>Request</u>

- Sender: user ID of the user who has sent the buddy request.

- Receiver: user ID of the user whom the buddy request is sent to.
- Status: “Accepted” if the receiver has confirmed to accept the buddy request; “Rejected” if the receiver has confirmed to reject the buddy request.



<u>Buddy</u>

- User: ObjectId of the user that this Buddy object belongs to
- Buddy: ObjectId of the user that is this User’s buddy
- Dailys & Todos: Embedded data. Array of Objects that has the fields “task” and “status”.
- chatId: chat ID of the chat that belongs to this buddy pair



<u>Chat</u>

- buddyId: An array of 2 ObjectId, each belonging to the corresponding Buddy Object for the buddy pair
- Messages: An array of ObjectIds with reference to Messages Collection



### Implementation

#### <u>Buddy Chat:</u>

For implementation of the buddy chat system, we chose to use socket.io library to establish a WebSocket connection which ensures that the connection between the browser and the server is sustained and low-latency.

We implemented a Socket instance in the Server that listens to any socket connection from the frontend. Then on the client side, we implemented another socket client instance in the Buddy chat component. These 2 instances act as both event listeners and event emitters. A websocket connection would be established between server and client every time the user enters the BuddyChat component as the initial render of the component initiates a connection and then emits a “Join room” event to the server for user to join a socket room/channel using the buddy pair’s unique chat Id. 

<img src="https://lh6.googleusercontent.com/W6bHqe8jCvZzZpZh40Zc3FpvUKYjld3y3-ynPsE_w8qUuk8Z6Ek8pPX9sOZzG3VIb0vyd61JDT5A8l6GDXPq-4wlqUA0t3hfq3xady1Upq8671PqJoUvw0bizMizvjiuFdEPLLB2" alt="img" style="zoom: 50%;" />

<div align="center"> <em>Buddy Chat Component Socket Instance</em></div>

<img src="https://lh5.googleusercontent.com/wP1can5jmnEwqsfKNylpyM8CfPF8w7uKqM9SpG5Pc5jcN2Lst3z4rRHkFh21SfegvxLxH8ilKwYQrieQHDJOVyaoyrfU__jU1qfoj4OC5Cf6wWhTint2QdAh4Dc2keBPlZCLq6kz" alt="img" style="zoom:50%;" />

<div align="center"> <em>Socket instance in server</em></div>

To send a message, a socket event emitter is triggered after the user hits the send button or the enter key. This is handled like a normal submit button but a socket connection is used instead.The socket instance on the server side would be listening to any events and then processing the data accordingly.

Example:

- If the “Send Message” action is emitted from the client side, the server would be listening to it and then run a sendMessage function that updates the database. 
- However, for messages to be seen immediately by both users in chat, we must also include an event emitter from the server side to send the message back to the client side.
- The client socket would be listening for the action “Receive Message” from the server. 
- This listener would then call for a method “messageSent” to the redux store.
- “messageSent” would update the redux store for chat and cause the chat component to rerender due to the structure of our Buddy Chat component.
- Message is then displayed.



#### <u>Using of Redux for State Management</u>

We used redux for state management as our application is rather large and requires many API fetching requests, hence to minimize the load on the server, we used Redux as a centralized information distributor. The use of redux has also allowed us to make our components more responsive in a simpler manner.



Example for minimising calls:

- For logged in users, we store the user information both in redux store and the localStorage. Hence, anywhere user information is required, we are not required to fetch the data again, instead we could just fetch from the redux store.

<img src="https://lh4.googleusercontent.com/IoramDbfvTtr9PHOgq0m2I1pQx3szXEcwC1G6bNjzNcQ3Uh3QJSylCsD6PK2M4t90t9qGA2RqafDluKCSyn-WFL_CH2ijIc8Y_d_0HRGyjoIuZ2vt2reDDFiHcL1tap2J4jKcDmd" alt="img" style="zoom:50%;" />

<div align="center"> <em>Connecting components to Redux Store</em></div>

Above is how each component can be connected, mapStateToProps function would return the specified fields in redux store as props of the component.



Example for Responsiveness for Components

- Since all React Components would rerender when the props or the useEffect hooks dependencies mutate, we need to ensure that when the store updates, the components would detect a change and rerender accordingly. 
- Hence, one of the most important rules is to ensure that all the Reducers that update the state are immutable. And also, the more specific the state the component calls from the redux store, the more reliable the application because of array and object types’ references.
- Below is a code snippet of our deletePost Process. The deletePost action would be dispatched first and then a delete request is sent to the server.



<img src="https://lh5.googleusercontent.com/io9Sr_qQKzOb7vYZdh9e8wcAlG8c-crGK6WKbl-ogcfU7HUCrT8NkaIleJTDapfMdo-0tuhQQcgyjDtC5zFXj_DDfHMklZNcEdSLguT2m6zviyzqmygNv67yo05UqU4dxz7O8en-" alt="img" style="zoom:50%;" />

<div align="center"> <em>Delete Post Action Creator</em></div>

- The action creator would then dispatch 2 actions to the post and goal reducers. And both Redux state post and goal would update.

<img src="https://lh6.googleusercontent.com/YnC3CsGiFMCnnhVtl17DEfxQrDcOpdG9FhQM2PRvwUit5PUl-xH1xODYfu62azd9oVk9wmmTenvlyya7hlQS1sMH7S1JlABwBc0OUV5lfQkGNlH3uh-7dJr_6D1lCTJJVGpwWHIw" alt="img" style="zoom:50%;" />

<div align="center"> <em>Goals Reducer - Filters the deleted post from the Goals object stored in store</em></div>

<img src="https://lh6.googleusercontent.com/4WAADVMNff3eURwhGdtL7p8TRrKmvA6L25baj9KzX5TjvBNjHxO4ffKst8TdVi4QQhH0err9SADR6Zvpp91PM-mjHEOHLbIHOw04GYCSIU_-IqxdXqejOzA8i0i-wVHIS4SzilsX" alt="img" style="zoom:50%;" />

<div align="center"> <em>Post Reducer - Filters out deleted post from lists of posts in all the pages</em></div>

- As the Redux store is passed down as props, once the store changes, the props have also changed, causing PostNoteBet and Feed Components to re-render and display the correct information without having to refresh.



#### <u>Cron Scheduling</u>

We used node-cron to implement job scheduling such that we do not have to update the database at scheduled timings. Node-cron behaves like the cron in Shell, as it queues the task to run at that specific time everyday. For our implementation, we run a buddy collection update to update the days left for buddy, todos to late and shift the todos to dailys. We also run a goal collection update to update the status of the goals. Here is a code snippet of our implementation for updating buddy:

<img src="https://lh4.googleusercontent.com/WeELb7xkpj_--LDFLsbsLcXQPMZz9AQ4ydwqETQCwNY23xKfFjTbEaHfbCVVhHzO1zh-7sqfA1qawDqMrID4TYiRQZS71ZZxD5-cH6icI6YRjuDvZJWE0Apulj4DVr0bzbL6n6W3" alt="img" style="zoom:50%;" />



#### <u>Uploading of Images</u>

In Milestone 2, we use Multer middleware to allow users to upload images for their posts to our server. 
Considering the nature of our application (requiring users to upload images as proof of their progress), there will be a lot of images uploaded and this abundance of images could slow down and destabilise the Heroku server even more. As such, we have decided to use the cloud storage provided by Google Firebase to store the images uploaded by our users and retrieve user’s images more quickly on the front end by storing the image URLs provided by Firebase in the user model (for profile and cover pictures) and/or post model (for images uploaded from record post section). 

<img src="https://lh4.googleusercontent.com/rqaPuyI8v46LZAwHbSZPdjat4lDM47MFd3M6KpUfU26ItVspLDApeDf-sn7V3qFrIVbqtMIJGzS0qcruApFidWmBd8n0W_dSZ9hXRcH7bmCYB15GbvSzWy9_ApEmj0mFwSOD1qlg" alt="img" style="zoom:50%;" />

<div align="center"> <em>The above screenshot shows a hook to connect Firebase with our app components. </em></div>



Line 16 is how we name the images in Firebase - the image’s original name stored in the user’s device concatenated with the date when the image is last modified. Concatenating the date when the image is last modified is to lower the probability of two different images with duplicate names being uploaded to Firebase. If files with duplicate names are uploaded, Firebase does not create a new URL for the later file but instead returns the URL of the previous file uploaded which may result in inaccurate images being displayed on the frontend. 
<img src="https://lh4.googleusercontent.com/ja1XeUJ9MLtmzomVqOe2RWfXAvEipdDA6cMQH6oCJwwpOm5Q4YmkHfzTQG2VT5GdXIjqKj0puxN5Wkap6jtmndamlOEVQAuEZCWY2tgvp2vnTtwDG5rbWVVHF2dG3in6pdE3ELLp" alt="img" style="zoom:50%;" />

<div align="center"> <em>The above screenshot shows how we utilised the created hook to upload profile and cover pictures to Firebase. </em></div>

Once an image has been successfully uploaded to Firebase, useStorage hook returns an object with the URL of the image address from Firebase which we can then use to update the particular user object in the back end.



### Maintenance

As technology progresses, some middleware functions may become deprecated and/or outdated. To ensure compatibility, we would review and update our program periodically if necessary.
Furthermore, following some self-reflections and with the user feedback provided, we have come up with the following table of our current application’s limitations coupled with possible improvements in future.

| Limitations                                                  | Possible Improvements                                        |
| ------------------------------------------------------------ | :----------------------------------------------------------- |
| <u>Relative Long Response Time and Instability of Web App</u><br />As we are using free servers, our deployments may be unstable and slow. <br /><br />E.g. goals created may not be rendered immediately after user created a post, instead it takes a few seconds for it to change from a filled form into a new goal<br /><br /> E.g. after the creation of a new post at the progress page, it takes some time for heroku to retrieve back new posts to be rendered. As such, it also takes some time for the record component to be disabled after the user clicks the “Record” button. Consequently, if the user clicks the “Record” button multiple times before the new post is rendered, it may result in multiple posts being created, which results in inaccurate progress being recorded. | If our application were to become popular, we might consider deploying our application on paid servers for better user experience and more stable deployment. |
| <u>Security</u><br />Also, our backend routes are not protected and hence poses a vulnerability. For instance, a potential hacker would only need to get the user’s id to hijack many of the backend routes such as getting user information, posting under the name of the user etc. | To tackle this, we initially attempted to use a token-based authentication system however, we faced many issues during deployment and reverted back to our current session-based authentication. <br/>For the token-based authentication, ideally we would have an authentication middleware that checks if the token is correct. Only if the token is correct would users be allowed to use that route. Hence, all routes both backend and frontend would be protected. Unfortunately, our previous implementation was riddled with bugs for the deployment build.<br/>Moreover, given more time, we could add email verification after a user has signed up for an account before allowing the user to access our internal application system. |
| <u>Cron Job Scheduling</u><br />As many of our features are time-gated (e.g. Buddy todo, goals updating), to achieve this, we used the node-cron package to schedule updating of the database at 00 00h everyday. However, as our production build uses Heroku to deploy our server, node-cron’s behaviour becomes unpredictable due to Heroku periodically moving our dynos from one server to another. | To tackle this, we have planned to use the heroku add-on scheduler that allows us to schedule a time to run our script similar to cron. However, due to a shortage of time we have yet to implement this. |

Apart from the above potential improvements to tackle our application’s current limitations, looking forward, we would like to propose more functionalities for our buddy system in future. 

- We could add a label beside users’ profile picture/username to indicate if the user already has a buddy so that other users would not have to go to multiple users’ profile pages just to check that if he/she can request those users as his/her own buddy.

- If the student does not have a suitable buddy in mind, we will pair these users randomly. Ideally, we would like to put buddies into a voice call with a panel of options that can indicate what each other are doing (such as studying, taking a break etc.).

- Add push notifications to remind users of their todo items (and goals) - might be more effective for a mobile application rather than a web application.

- We can also add a green dot on Buddy Profile Picture in the Buddy page to indicate if buddy is online or not.

  

Given more time and improved skills, we would also like to develop a mobile application version of Punkt for more convenient usage and thereby increasing the effectiveness of Punkt.



## **Software Engineering Practices**

Some software engineering practices we learnt and tried to applied during our Orbital Journey are as follows:

### DRY Principle(Redux Store)

DRY (Don't Repeat Yourself) principle: Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

We used the redux store to determine when the react components rerender hence it is very important that the information in store is correct and updated when required.

Our application achieves this by using Redux architecture for our front-end. The single Redux store stores all the different states including the information sent from our backend server. All the information/knowledge is stored in the unambiguous, authoritative representation - redux store, such that our react components can call for any information at any point in time. 

Refer to our Implementation section of Redux Store for more details.



### Separation of Concerns (SoC) (React Components)

Soc states that to achieve better modularity, separate the code into distinct sections, such that each section addresses a separate *concern*. Our application achieves this by separating each page into different react components. 

For example, our main page is divided into 3 sections (excluding navigation bar and footer), namely, feed, user’s own bet and daily todo with buddy: 

- The Feed component takes in an array of posts as props and just simply map it across posts 
- User’s own bet section displays a form for which the user can fill in to create a bet. If the user has already created a bet, this section will display the progress of the bet and allow the user to be redirected to a page to record his daily progress. 
- Also, if the user is paired with a buddy, the Daily Todo section displays the todo items that the user has set for himself. This section also has a button that directs the user to the buddy page where he can see more information about todo items and buddy live chat. 

In this way, each functionality is taken care of by separate components. This makes our code clearer and more scalable, in case we need to render the same component in different pages. 

While our application obeys Separation of Concerns, the application is still very responsive as all components are tied to the redux store rather than passing down props. 

The Redux store allows the application to be responsive across all the different components despite only triggering one action in one isolated component. e.g. Deleting a post on the Main page. Your progress bar on the Long Term Bet would decrease correspondingly, the progress on related posts would also change correspondingly (⅔ to ⅓ ).

When an action is triggered and is successful, the redux store would update all corresponding fields in the store and all the components that require these data would detect a change in props (react-redux connect function) and thus rerender to change the displayed information. All these renderings are tied to the redux store and the functionality of the components are still separated. If the action has failed then the redux store would not update and components would simply just not rerender, rather than the application breaking. The usage of the redux store ensures a responsive application and also a more reliable working application.

Refer to our Implementation section of Redux Store for more details.



### Law of Demeter

An object should have limited knowledge of another object. An object should only interact with objects that are closely related to it. 

Our react component itself does not contain information about other components that are not its children component. For example, our Explore component and its child component, Feed only contain information about each other since they are closely related in a parent-child relationship. Both components would not contain information about e.g. Profile Component since they are not closely related.

Furthermore, the use of our redux store also ensures that all components have minimal unnecessary interaction since user data or page information will not be passed down as props but rather fetched from the redux store from that component itself. 



### Version Control with Git

We attempted version control with github with one of us working on the master branch and another working on a branch branched out from the master branch. While this was not the best approach, we worked with it by pulling, merging and fetching as often as possible. We meet up frequently for merging and review sessions to ensure that the code on both our branches are updated. 

We did run into some merging conflicts along the way and in hindsight, it would have been better to have 2 working branches branched out from the master branch and an untouched master branch. Both of us should ideally be working on our own working branch, reviewing the code and merging regularly into the master branch.
<img src="https://lh5.googleusercontent.com/S41qK6lHZI8LEBbRIKhznabaEWkfl56rArR9JlmmG-INTnOi5_NTP1-SxN7h7rdRaU5Mpk32Lzc606I7QTYJ8T3GHYc7V77Um3jBMgf11zrEotDART-bIbyPD2o9bF0SD9Jb11hA" alt="img" style="zoom:50%;" />

<div align="center"><em>Git Merge History</em></div>



<img src="https://lh3.googleusercontent.com/Q6Z_0d72k9HLdlaTyOZna2oZVZasDTtBwwMLWhMfyQIg-5IiIn_6Z-MJJK7FK_ZYyH-xePfAM-W3SeD2dkhk-6-0sWUbm1LMJB1WH87UNAiEvnDk0GCjpH-A57jj4e-ww3rgO7QO" alt="img" style="zoom:50%;" />

<div align="center"><em>Git Commits History</em></div>

### Testing

#### Postman API Testing

We tested all our backend routes using postman. The below google sheets are the results of our testing. 

We tested both negative and positive test cases with the exception of server errors as that would be out of our control. Our testing aims to test all routes and their different responses, for example, for the POST “/” request route, we tested for both expected response under different scenarios:

1. Requested Buddy already has an existing Buddy
   - Should return a Response String saying “User already has a Buddy!”
2. Valid Request
   - Should return a successfully created Request Object with the relevant details.
      Automated testing was not used due to Heroku’s slow response time.

We made a test for response time under 1000ms, however Heroku’s slow server results in unstable results of our testing in our different test cases. Hence we chose to ignore the response time test in our overall results.

Please refer to this [spreadsheet](https://docs.google.com/spreadsheets/d/13_eR_b9Fl3GYxeSC7E1Uv90R7sP5w0z23gEaNRprzoQ/edit?usp=sharing) for more detailed Postman API Testing.

<u>Limitation of Postman API Testing</u>

API endpoints were tested manually and on a small scale basis. As such, we might not be able to encounter corner cases during manual testing. Given more time, we could have learnt how to write scripts for automated testing to test the endpoints more extensively.



#### System Testing

We used the white-box approach in our System Testing.

We included both negative and positive test cases such as Login, Signup success cases and also checked for Login errors and Signup errors if user inputs incorrect credentials. This ensures that all the functionalities work as expected under testing.

Since many of our functions require user input such as “Record Posts”, “Set a Goal”, “Set a todo”, “Edit Profile” etc. We have used **No More Than One Invalid Input in a Test Case** to ensure that all the functions that require inputs are working as intended. An example for Signups inputs as shown below:

| No.  | Username            | Email              | Password                                      | Confirm Password                            | Expected                                             |
| ---- | ------------------- | ------------------ | --------------------------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| 1    | A register username | VV                 | VV                                            | VV                                          | Error: “username has already been registered”        |
| 2    | VV                  | A registered email | VV                                            | VV                                          | Error: “email has already been registered”           |
| 3    | VV                  | VV                 | Password that does not match the requirements | Same input as the password section          | Error: “Password does not match requirements”        |
| 4    | VV                  | VV                 | VV                                            | A different input from the password section | Error: “Passwords do not match”                      |
| 5    | VV                  | VV                 | VV                                            | VV                                          | Successfully signs up and is redirected to Main page |

VV = any Valid Value

For Create a Goal function, we also implemented the **Each Valid Input At Least Once in a Test Case** on top of the **No More Than One Invalid Input for Each Test Case** since there is more than one valid input for the Atonement field that leads to different behaviour. Below is a detailed description of our test:

| No.  | Goal  | Atonement        | Days | Expected                                                     |
| ---- | ----- | ---------------- | ---- | ------------------------------------------------------------ |
| 1    | VV    | Empty            | VV   | The Atonement for this particular goal should be the default - “Fulfil a request from the comment in the first post with most likes". Can be verified in the Progress Page. |
| 2    | VV    | VV but not empty | VV   | The Atonement displayed should be the one specified by the user. |
| 3    | Empty | VV               | VV   | A tag that says “Please fill out this field” should appear   |
| 4    | VV    | VV               | 2    | A tag that says “Value must be greater than or equal to 3” should appear. |

VV = any Valid Value

Since several of our features are time-gated and behave differently at different timeframes, we have also identified a set of **Equivalence Partitions (EP)** for testing to improve the efficiency and effectiveness of our testing.

One such prominent example is of the Goal feature, we have separated the different behaviours of a goal into different timeframes as partition:

1. When Goal is in progress
2. When Goal has been completed
3. When Goal has failed

Firstly, for the First case (In Progress Goal), users should be able to Record Posts once a day in the Progress Page of their goal. And each post they post under this condition should have the correct day labelled above their posts in this fashion “DAY 1” etc.

Next, for the Second case (Success Goal), the users should see their Productivity Points increase and also Ranking increase if applicable. Also, their Post Note for Betting in the Main, Explore and Speculate Pages should also become a form for them to set their next goal.

Lastly, for the Third case (Failed Goal), the users should see their Productivity Points decrease and drop in rank accordingly if applicable. Their Post Note for Betting in applicable pages (Side Bar on Main/Explore/Speculate Pages) should also become a form for them to fill in. Also, in the Settings Page, under Goals History, the failed goal should have a “Create” button allowing users to post an Atonement post, and the Atonement Post should have “ATONEMENT” labelled onto it. Post progress should also not record this Atonement as part of the user’s progress.

Please refer to the this [spreadsheet](https://docs.google.com/spreadsheets/d/1njyuojJUUHZP87iJ_t9PqyhyIb8kt7XUmUCwdaTjUoM/edit?usp=sharing) for more detailed system testing.



#### User Acceptance Testing

We gathered a group of users to test our web application with User Guide provided and asked them to submit a Feedback form using Google Form. 

The response summary can be found [here](https://drive.google.com/file/d/1aR9kcXEBHkT_kt6hG1lqjZ7nvWmFWURh/view?usp=sharing). (Rating ranges from 1 to 4 with 1 being Strongly Disagree and 4 being Strongly Agree)

Note that the question asking for good points of our application was added at a later time, resulting in only three responses for that question but some users messaged us to provide positive feedback after their exploration of our application.

Overall, our web application is well-received and many of our users felt that this application is useful and effective in helping them reduce procrastination.

The following table provides a summary of the good points and shortcomings for our application.

##### <u>Merits</u>

- Well-designed and aesthetic user interfaces.
- Smooth transition and no lags. 
  - ==side note: personally we feel that our app has been slowed down quite a lot due to Heroku, it is much smoother on localhost D: and due to Heroku lags, we removed some nice transition animations :’(== 
- User guide is detailed and easy to follow
- Inclusion of both short term and long term goals.
- Novel features
- Cool buddy features



##### <u>Areas for Improvement / Bugs</u>

==[Non-technical] The term “atonement” is not intuitively linked to forfeit which results in some users not understanding what the atonement field for goal creation is for.==

- Response: 

  We annotated that “Atonement” refers to a forfeit for users if they fail to complete their goals in the User Guide to clarify this.Smooth transition and no lags. 



==[Non-technical] Too many features which might confuse users who have just started using the app.==

- Response:

  We tried to make our User Guide as detailed as possible to clarify any confusion and for users to get a hang of the app more quickly. 

  We have also included a demo video in our user guide to guide users on how to use our app if the user prefers visual and audio learning to reading the User Guide.

  The Contact Us page is also added to users to contact the developer team more conveniently.User Guide is detailed and easy to follow



==[Non-technical] The many icons on the NavBar were confusing, no idea what the different symbols meant.==

- Response:

  We immediately rectified this by adding more CSS and styling such that when a user now hovers over the specific icon, a mini stylised tag would show immediately instead of the previous default HTML title since there was a significant delay.Inclusion of both short term and long term goals.

  

==[Technical] Can include a feature to set a max number of days for a goal.==

- Response:

  We would like to encourage our users to create long term goals. If the user sets a goal that lasts for an unrealistic time period (e.g. 1,000,000 days), the user is putting himself/herself at a disadvantage of not being able to complete the goal. 

  Since there was no punishment for failed goals previously, except for the need to create an atonement post, we have added a “punishment” feature that reduces the user’s productivity points (by no. of users bet against * 10 + 10) so that users are more likely to set reasonable long term goals.

  Future improvement for our penalty system could include a reduction in the number of productivity points by the number of days that the user has delayed posting of his/her atonement post so that users have a greater urgency to atone for his/her failed goals.



==[Technical] Users are able to sign up with a fake email account, making the application not very secure.==

- Response:

  (mentioned in our Maintenance section)

  Given more time, we would like to add an email verification when users sign up for an account.Cool buddy features



==[Technical Bug] Click another user’s profile, then click the user’s own profile page. The cover and profile pictures displayed belong to the previous user.==

- This was an oversight on our part and we have resolved it by updating the state “user” (the user on the profile page) when the react router’s params were not equal to currUser’s username (the logged in).



==[Technical Bugs]== 

1. Form for creating a new goal is not shown after the goal is completed successfully.
2. Number of days (and status of the goal) completed on the Bet Status component was not updated after a new post was created.
3. The cover picture of Profile Page requires a refresh to see a change. I.e. not responsive enough.

- Response:

  These were regression bugs we encountered after trying to improve our User Experience by rendering the newly created post immediately instead of force reloading the page that the user was on after he/she has created a new post. 

  To solve these regression bugs while ensuring that our UX was still smooth, we read into the React docs and the different cases of props change that will cause components to rerender. What we found out was that React’s useEffect and functional components only do a shallow check for the different props. So, if we were to simply mutate the data in Objects or Arrays, no change would be detected, our changes must be immutable for React to reliably rerender when desired.

  Hence, with this knowledge in mind, we had 2 strategies to opt for:

  1. Make props retrieved from redux store as specific as possible, e.g. if we want to rerender the component specifically based on the field “postIds” in “goals”, instead of simply retrieving the “goals” object in store, we should specify “goal.postIds”.
  2. After we retrieve the data from Redux Store, we store it in the component using useState(). useState() will reassign the state, resulting in an immutable instance of the state.

  

  We employed both methods depending on which is more suited for that specific component.

  Not only does immutability play a big role in ensuring a smooth UX without force refreshing, with our large number of features and each component having many other dependencies, timely updates to the Redux Store were also needed.

  After actions that have numerous dependencies have been triggered, we need to update the respective data in the different parts of Redux store for other components to register this change. More details can be found in the Redux Store of Implementation section.



==[Technical Bug] Sending one message may result in multiple messages of the same content being displayed.== 

- Response:

  This is a bug due to our implementation of socket.io which occurs on a random basis, the messages will be rendered correctly after refreshing the page.

  We resolved this issue by using Redux. We check if the new Message received from socket has already been appended before by filtering out the messages with the same id. This would ensure that no messages would be displayed more than once. While this is not resolving the problem at its root, it does mitigate the effects of it. We opted for this solution as the exact root cause of this problem is still a theory and rather than risking it, we chose the more familiar route that has a lower risk of ending up with more potential bugs.

  

  <u>Before code modification:</u>

  - Out of the 130 times we tested the chat messaging function, the bug appeared once.
  - Probability of the bug happening: ~ 1/130
  - From our testing, if you were to encounter this bug, it is unlikely to happen again after refreshing the page.

  

  <u>After code modification:</u>

  - We have modified the code to rectify this bug and have tested 200 times for this bug.
  - Out of the 200 times we tested, we have not seen the bug again.
  - However, as of now we are unsure if the bug is truly rectified or just the probability of it happening is very low.
  - Probability of the bug happening: 0/200



==[Technical] Unable to upload images.==

- Response:

  This bug was reported by a user who was accessing our web application from China. In the process of attempting to debug this problem, we found that the cause for this issue is that we are using Google’s Firebase cloud storage for uploading images. Due to China’s Firewall policies, the requests cannot be sent to Firebase successfully.

  Comparing the pros and cons of using Firebase and multer middleware for uploading images (as mentioned in the Implementation section), we have decided to continue with using Firebase. For users who are accessing our app from countries with access restrictions to Google’s services, we would recommend them to access our app using a VPN.

  If more time were given, we might be able to source for a better replacement for Firebase for uploading of images to rectify the root cause of this problem.



==[Technical] Could add push notifications to remind users about their goals and todo items==

- Response: 

  Good suggestions but unfortunately, we have no time to implement and test for these features. 

  

==[Technical] Could add a feature to record time spent on each goal.==

- Response: 

  Good suggestions but unfortunately, we have no time to implement and test for these features. 

  

==[Technical] Could allow users to set their goals as private== 

- Response: 

  Good suggestions but unfortunately, we have no time to implement and test for these features. 



<u>Limitations of User Acceptance Testing</u>

- Small sample size: 
  As we did not have sufficient time and manpower to gather more users to test our app, our small sample size may result in inaccuracies for app review. 
- Possible biases:
  As per previous point, due to the lack of time and manpower, the users we have gathered are those whom we are close with and they might be biased towards our application knowing that it is our hard work for the past three months..



## **Development Timeline Summary**

Milestone 1:

- Frontend and Backend for Sign Up, Login.Frontend for Forgot Password and Reset Password pages.

Milestone 2:

- Frontend and Backend for Betting Goals related featuresFrontend for Leaderboard, Settings and Buddy system

Milestone 3: 

- Change React Context to Redux for better state management
- Integrated frontend and backend for Forgot Password, Reset Password pages.
- Integrated frontend and backend for Leaderboard, Settings and Buddy system



## **Project Log**

**Ang Koon Hwee**

| **Day** | **Completed**                                                | **No. of hours** |
| ------- | ------------------------------------------------------------ | ---------------- |
| 4 May   | Team       meetup   Poster       design                      | 2                |
| 6 May   | Video       script-writing                                   | 1                |
| 7 May   | Script       refinement                                      | 1                |
| 12 May  | Liftoff       meetup   Voice-over       recording for video   HTML | 4                |
| 13 May  | HTML       + CSS                                             | 8                |
| 14 May  | Javascript       + CSS                                       | 5                |
| 15 May  | Javascript                                                   | 5                |
| 16 May  | Javascript                                                   | 4                |
| 17 May  | Javascript       + DOM                                       | 4                |
| 18 May  | DOM                                                          | 3                |
| 19 May  | Zoom       discussion on skeleton pages to create + colour scheme   DOM | 3                |
| 20 May  | Async       JS                                               | 2                |
| 21 May  | AJAX/AJAJ       & APIs                                       | 3                |
| 22 May  | Node                                                         | 3                |
| 23 May  | Contact       Page (3hr)   User       profile page wireframe (0.5hr)   Modules       and NPM (0.5hr) | 4                |
| 25 May  | Express       + EJS   REST       api                         | 3                |
| 26 May  | MongoDB       (1.5hr)   Integrating       style of XY’s webpage to Contact page (1.5hr) | 3                |
| 27 May  | MongoDB       + Mongoose + Express                           | 4                |
| 28 May  | MongoDB       + Mongoose + Express   CRUD                    | 3                |
| 29 May  | Zoom       meeting to add on wireframing and complete Milestone 1 submission   Contact       page restyling | 6                |
| 30 May  | CRUD   Mongoose       + Express                              | 2                |
| 1 June  | Middleware    Handling       Errors                          | 3                |
| 3 June  | Mongo       Relationships with Express   Data       Relationships with Mongo | 3                |
| 4 June  | React       - jsx & props   Express       Router & Cookies   Express       Session & Flash | 4                |
| 8 June  | React        Class        based Components    State      Planning       routing and schemas for User profile page   Authentication       and Authorization | 4                |
| 9 June  | Customize       bootstrap theme   React       - Lifecycle Methods | 3                |
| 10 June | Routing       Register    Login/Logout    Posts        (Maybe changed to bets) | 2                |
| 11 June | React       Hooks and Navigation                             | 4                |
| 13 June | Backend       for Profiles and mockup backend for posts and bets | 4                |
| 14 June | User       profile frontend part 1                           | 3                |
| 15 June | Weekly       review                                          | 2                |
| 16 June | Redux       + React Router                                   | 3                |
| 18 June | Buddy       page front end                                   | 3                |
| 20 June | User       profile styling and changing to redux   Debugging       user profile   Attempt       to merge XY and my parts | 3                |
| 21 June | Socket       io api   Weekly       meeting                   | 3                |
| 22 June | Understanding       XY’s code   Attempt       at debugging Oauth   Authentication | 3                |
| 23 June | Changing       authentication to token-based authentication   Routes       restructuring   Authentication       backend | 4                |
| 24 June | Context       api   Updating       front end to handle token-based authentication part 1   Restructuring       front end state management using redux part 1 | 4                |
| 25 June | Updating       front end to handle token-based authentication part 2   Restructuring       front end state management using redux part 2   Adding       route and model for Profile | 5                |
| 26 June | Updating       front end to redux part 1   Debugging       react | 5                |
| 27 June | Milestone       2 README (4.5hr)   Updating       front end to redux part 2 | 6                |
| 28 June | Testing       and updating features   Updating       to redux   Debugging       application | 7                |
| 29 June | Debugging       posts   Testing       routes                 | 7                |
| 30 June | Deploying       server to heroku   Testing       all front end routes   Debugging       deployment | 8                |
| 1 July  | Deploying       frontend   Debug       cors policy   Debugging       frontend deployment   Debugging       jwt authentication middleware   Redeploy       older simplified version of application | 8                |
| 4 July  | Revamped       Buddy model to cater to new ideas   Slightly       edited profile routes | 3                |
| 5 July  | Buddy       request system model   Learn       about cron scheduling | 3                |
| 6 July  | Implementing       cron scheduling on buddy dailys and todos   Redoing       redux implementation of the application part 1 | 4                |
| 7 July  | Removing       context api   Redux       for authentication  | 1                |
| 9 July  | Redux       for goals   Making       redux middleware from localStorage load to store and saving from store       to localStorage | 4                |
| 10 July | Testing       localStorage redux middleware   Debugging       localStorage redux middleware | 5                |
| 11 July | Redux       for posts   Clearing       code                  | 6                |
| 12 July | Debugging       goal corner cases   Redux       for posts part 2 | 7                |
| 13 July | Progress       Page debugging   Progress       page redux    | 5                |
| 14 July | Settings       page redux   Settings       page cleaning up code | 4                |
| 15 July | Pullng       from master branch   Updating       redux posts due to merge conflict | 6                |
| 16 July | Debugging       bug caused by useEffect throughout all components   Restructuring       post components   Make       feed component more responsive by restructuring redux store   Integrate       buddy backend and frontend | 7                |
| 17 July | Restructuring       Progress Page components   Debugging       Progress Timeline component   Make       Progress Page responsive by restructuring redux store   Make       createPost action responsive, i.e. no need to refresh to see update | 7                |
| 18 July | Redux       Settings page   Redux       Profile Page   Make       deletePost responsive i.e. no need to refresh to see update   Restructuring       comment reduc store   Comment       component debugging | 8                |
| 19 July | betStatus       component debugging   Buddy       todos state debugging | 6                |
| 20 July | More       improvements to app’s UX   Resolving       merge conflict   Chat       model and route   Message       model and route | 7                |
| 21 July | Implement       chat   Socket       io researching   Socket       io testing with express   Debugging       socket connection   Redux       for chat | 7                |
| 22 July | Update       request data model   Test       and debug request routes | 7                |
| 23 July | Request       frontend setup   Request       notifications   Request       restrictions frontend | 8                |
| 24 July | Updating       buddy todos to show late   Deploying       Server   Debugging       minor details   Deployment       of frontend | 9                |
| 25 July | Postman       API Testing   Debugging       minor details   Report       writing | 9                |
| 26 July | Postman       API Testing   Report       writing   Milestone       3 Video | 9                |
| Total   |                                                              | 306              |

 

**Wu Xiao Yun**

| **Day** | **Completed**                                                | **No. of hours** |
| ------- | :----------------------------------------------------------- | ---------------- |
| 4 May   | Zoom    Poster       design                                  | 2                |
| 6 May   | Making of video                                              | 5                |
| 9 May   | HTML + CSS                                                   | 6                |
| 10 May  | CSS + Bootstrap                                              | 5                |
| 12 May  | Meetup    voice-over       recording for video   Video       editing (addition of voice-over recordings)   Wireframing       of home (advertising) + sign up/log in pages | 2                |
| 13 May  | Javascript part 1                                            | 5                |
| 14 May  | Javascript part 2 +  DOM                                     | 4                |
| 15 May  | jQuery                                                       | 3                |
| 16 May  | Node.js   Express.js                                         | 5                |
| 17 May  | Git    EJS                                                   | 5                |
| 18 May  | MongoDB + Mongoose                                           | 5                |
| 19 May  | MongoDB       + Mongoose   Zoom       discussion on skeleton pages to create + colour scheme | 5                |
| 20 May  | Sign up page frontend  part 1                                | 3                |
| 21 May  | Login page frontend  part 2                                  | 3                |
| 22 May  | Home Page                                                    | 6                |
| 25 May  | Learn about  authentication for sign up/login backend        | 4                |
| 26 May  | Sign up/login backend  integration part 1                    | 7                |
| 27 May  | Sign up/login backend  integration part 2 (send email for password reset) | 7                |
| 28 May  | Sign up/login backend  integration part 3 (send email for password reset)  Integrate database  with MongoDB  publish web app on  heroku | 7                |
| 29 May  | Orbital       Mission Control #3 UI/UX Workshop (2.5h)   Zoom       meeting to add on wireframing and complete Milestone 1 submission (5.5h) | 8                |
| 31 May  | React       js                                               | 2                |
| 1 June  | React       js                                               | 1                |
| 2 June  | React       js                                               | 7                |
| 4 June  | Social       media web app tutorial                          | 3                |
| 5 Jun   | Mission       control UI/UX Workshop Part 2 (2)    Mission control Software Testing Workshop (2)     Social       media web app tutorial | 6                |
| 6 Jun   | Social       Media web app tutorial                          | 3                |
| 7 Jun   | Change       web app from ejs to react   Community       main page react front-end | 8                |
| 8 Jun   | Community       main page react front-end                    | 9                |
| 9 Jun   | Progress       page react front-end                          | 6                |
| 10 Jun  | Progress       page react front-end                          | 5                |
| 12 Jun  | React       router, basic redux concepts tutorial   Async       js | 4                |
| 13 Jun  | Community       page back end: to show user posts and info from database on main page | 7                |
| 14 Jun  | Community       page back end: to show user posts and info from database on progress       page | 6                |
| 17 Jun  | Allow       multiple file uploads to record user progress    | 8                |
| 18 Jun  | Added       forgot password and reset password frontend    Tried       to re-activate google oauth in react | 3                |
| 19 Jun  | debugged       google oauth in react    Added       comment functionality   Set       up goal mongoose schema, added get goal and create goal routes for       backend | 7                |
| 20 Jun  | Link       progress page front end to backend (allow front end to retrieve info       from the backend to be displayed on page)   Set       up routes to update arrays of users who bet for/against & total       amount bet for and against other users’ goals as well as routes to       update user’s arrays of goals which he/she has bet for | 7                |
| 21 Jun  | Front       end: change appearance, visibility and functionality (disabled) of       betting buttons once user submits a bet   Link       front end betting to backend betting routes (to update goal’s bet       for/against array and user’s goals bet for/against array)   Zoom       meeting to discuss details about merging individual parts and todos for       next week (1h) | 5                |
| 22 Jun  | Set       up routing to update user’s goal status, amount won and lost as well as       the relevant information of the users bet for and against that goal | 6                |
| 23 Jun  | Linking       routing to update user’s goal status to the front end   User       settings page front end part 1 | 6                |
| 24 Jun  | User       settings page front end part 2   User       profile page front end | 5                |
| 25 Jun  | Buddy       Daily and Set Todo page front end part 1         | 7                |
| 26 Jun  | Buddy       Daily and Set Todo page front end part 2   Buddy       Live Chat frontend   Contact       us page frontend | 6                |
| 27 Jun  | Meeting       and writing of Milestone 2 report (4.5h)   Leaderboard       page frontend    Edited       settings page frontend | 8                |
| 28 Jun  | User       guide                                             | 5                |
| 1 Jul   | Deployment       of App                                      | 4                |
| 2 Jul   | Backend       added Report model and routes   Integrated       Report frontend with backend   Backend       added comment Model, modified Post model   Added       Like feature for comment   Added       error messages for login/register | 4                |
| 3 Jul   | Added       pagination    Added       forgot password, reset password and contact us functionalities   Added       search bar functionalities | 8                |
| 4 Jul   | Integrated       leaderboard backend with frontend   Change       uploading of multimedia to firebase instead of server | 5                |
| 5 Jul   | Integrated       settings edit profile details frontend with backend   Added       change profile and cover pictures functionality | 8                |
| 7 Jul   | Integrated       follow and unfollow user backend    Change       goal bet amount to atonement [incomplete]   Integrate       tables in Settings page [incomplete] | 5                |
| 8 Jul   | Added       create atonement post functionality   Add       reply failed messages frontend | 3                |
| 9 Jul   | Added       reply failed bets functionality   Added       view replies from bet users for failed bets functionality   Tutorial       on react class based components | 4                |
| 11 Jul  | Basic       redux tutorial   Basic       Firestore tutorial  | 4                |
| 12 Jul  | Zoom       meeting   Added       notifications panel         | 6                |
| 16 Jul  | Created       user feedback google form                      | 1                |
| 19 Jul  | Zoom       meeting for debugging                             | 7                |
| 23 Jul  | Zoom       meeting for debugging                             | 9                |
| 24 Jul  | Zoom       meeting   Edit       some css   Change       send mail options   Deployment       of app | 9                |
| 25 Jul  | User       Guide   Receive       user feedback and debug minor details | 9                |
| 26 Jul  | Demo       video script, record demo video, edit video   Milestone       3 README | 9                |
| Total   |                                                              | 320              |

 
