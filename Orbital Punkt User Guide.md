# User Guide for Punkt

- [User Guide for Punkt](#user-guide-for-punkt)
  * [Introduction](#introduction)
  * [Quick Start](#quick-start)
  * [Feature Guide](#feature-guide)
    + [Betting System](#betting-system)
      - [<u>Setting Your Own Goals</u>](#-u-setting-your-own-goals--u-)
      - [<u>Betting on Others' Goals</u>](#-u-betting-on-others--goals--u-)
      - [<u>Goal Outcomes</u>](#-u-goal-outcomes--u-)
    + [Buddy System](#buddy-system)
      - [<u>Buddy Request</u>](#-u-buddy-request--u-)
      - [<u>Daily Todo</u>](#-u-daily-todo--u-)
      - [<u>Set Todo</u>](#-u-set-todo--u-)
      - [<u>Live Chat</u>](#-u-live-chat--u-)
    + [Leaderboard](#leaderboard)
    + [Miscellaneous](#miscellaneous)
      - [<u>User Settings</u>](#-u-user-settings--u-)
      - [<u>Profile Page Cover Picture</u>](#-u-profile-page-cover-picture--u-)
      - [<u>Search for Friends</u>](#-u-search-for-friends--u-)
      - [<u>Forgot Password</u>](#-u-forgot-password--u-)
      - [<u>Contact Us</u>](#-u-contact-us--u-)



<div style="page-break-after: always;"></div>

## Introduction

> Do you find yourself procrastinating about school work or studying? 
>
> We feel you!

Oftentimes, we find it difficult to stay focus and make the best use of our time. Such procrastination breeds mediocrity and mediocrity breeds even severe procrastination when we slowly lose the motivation to improve.

Punkt is here to give you a little external push to stop procrastinating by raising the stakes of your study sessions and the completion of your goals with our 3 core features: 

1. **Betting System:** 

   Set your goals and bet with your friends. If you complete your goals, well done! Else, you will need to do a forfeit and prove it to your friends!

2. **Buddy System:**

   Get yourself a buddy with a common background to study with and improve together!

3. **Leaderboard:**

   Accomplish your goals and watch yourself climb up the "Productivity" Leaderboard!


<div style="page-break-after: always;"></div>

## Quick Start

> 1. Access our web application at [`https://punkt-orbital.netlify.app`](https://punkt-orbital.netlify.app)
>
>    View our Demo Video [here](https://drive.google.com/file/d/1l803ijBGdmbhO8nqqqm8hTfWFhuhAIpb/view?usp=sharing).

> 2. Click **"SIGN UP"** button on the cover picture or on the top right navigation bar as labelled in the screenshot below.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-1.png?raw=true" alt="punkt-1" />

> 3. Register an account using your email address. 
>
>    Username and Email Address must be unique. You will receive an error alert if there is already a user with duplicate username and/or email address.
>
>    Password must be at least 6 characters with at least 1 UPPER case, 1 lower case and 1 numeric digit.
>

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-2.png?raw=true" alt="punkt-2" style="zoom: 33%;" />



<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-duplicate-username.png?raw=true" alt="punkt-duplicate-username" style="zoom: 33%;" />

<div align = "center"> <em>Alert showing username has been registered.</em></div>

> 4. Once you have successfully registered, you will be directed to the main page of our app.
>    - The top navigation bar will display a search bar, buttons that redirects you to *Explore, Speculate, Leaderboard, Buddy, Settings* and *Profile* pages as well as a *Logout* button.
>    - You may hover over each of the icons to see which page it leads to.
>    - The left section of the page will display the posts created by you and those you are following. 
>    - This section will be empty if there is no post created by you and those you are following.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-3.png?raw=true" alt="punkt-3" style="zoom: 33%;" />

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-navbar-hover.png?raw=true" alt="punkt-navbar-hover" style="zoom: 33%;" />


<div style="page-break-after: always;"></div>

## Feature Guide

### Betting System

#### <u>Setting Your Own Goals</u>

> On the right bar of the main/explore/speculate page, under the section "My Betting Goals", you will be able to see a form to create a new goal if you do not have one currently. Fill in the form and click "CREATE" button to set a new goal.
>
> - If you have a goal, you will see the progress of your goal. Click 🖊 button to redirect to the Progress page of your goal.
> - If you leave "Atonement" section as empty, it will be set to default atonement "Fulfil the request from the comment in the first post with most likes" after you created the goal.

  <img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/WechatIMG6.jpeg?raw=true" alt="WechatIMG6" style="zoom: 33%;" />



> At the progress page, you can see your atonement, current progress (number of days completed) as well as the status of your goal ("In Progress", "Success", "Failed").
>
> *Details of each of the status can be found at "Goal Outcomes" sub-section below.*

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-bet-status.png?raw=true" style="zoom: 33%;" />



> Click the text area to add description to your post.
>
> Click "Image" to upload images as proof of your progress of the day. You can see the preview of the selected images and click ❌ button to remove an image.
>
> - You can only create <u>ONE</u> post a day with a maximum of 6 images per post.
> - Note: As we are using Google's Cloud services for the uploading of images, if you are currently in countries (e.g. China) with access restrictions to Google, you might face problems uploading images. We recommend you to access our application with a VPN service.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-record.png?raw=true" alt="image-20210725140133477" style="zoom: 33%;" />



> Once you have submitted your post, it will be shown under the Progress section of this page, and the section to create a post will be disabled until the next day 00 00h. 
>
> - If you are unsatisfied with your previous post (e.g. selected the wrong image), you can click the Delete button on the top right of your post and you will be allowed to create a post again. 

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-disabled.png?raw=true" alt="punkt-disabled" style="zoom:33%;" />

<div style="page-break-after: always;"></div>

#### <u>Betting on Others' Goals</u>

> If you have not followed any user, you can click "Explore" icon on the navigation bar to be directed to the page that displays posts created by all users.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-explore.png?raw=true" alt="punkt-explore" style="zoom: 33%;" />



> At the post component, click the section with light blue background that states the user's goal to be directed to the progress page of that goal.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-post-progress.png?raw=true" alt="punkt-post-progress" style="zoom: 33%;" />



> At the progress page of this goal
>
> - Click "THIS IS IMPOSSIBLE!" to display a "CONFIRM" button to bet against this goal. 
>

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-set-bet.png?raw=true" style="zoom: 33%;" />



> Once you have clicked "CONFIRM" for any of the choice, the button will be disabled and shown as a grey button.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-set-bet-disabled.png?raw=true" style="zoom: 33%;" />



> You can now see the posts related to this goal that you have bet at the Speculate page, with the Bet Against button under the post lighted up with red background colour. 
>

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-post-bet.png?raw=true" alt="punkt-post-bet" style="zoom: 33%;" />



> - Click the profile picture of the user to be directed to that user's profile page.
> - Click 🔥 button to increase the number of lits for the post (as a form of support for the post creator).
> - Click 💬 button to show all the comments and an input field to post your comment. 
> - Click 🧡 button to like a comment.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-post-details.png?raw=true" alt="image-20210725140841276" style="zoom: 33%;" />



> If you feel that the content of a post is inappropriate or the user is being dishonest in recording his/her progress (e.g. no proof or invalid proof), you can click ❗ button on the top right of the post to send our developer team a report. 
>

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-report.png?raw=true" alt="punkt-report" style="zoom: 33%;" />

<div style="page-break-after: always;"></div>

#### <u>Goal Outcomes</u>

`Case 1: Creator of the goal has successfully completed the goal by recording his/her progress consecutively for the number of days he/she has set for his/her goal.`

- No. of productivity points added to the creator's current points $={no. \;of \;users \; bet \;against}\times10+10$​​​
- Goal status will be changed to "Success".



`Case 2: Creator of the goal has failed the goal if he/she do not record his/her progress for one day.`

- No. of productivity points deducted from the creator's current points $={no. \;of \;users \; bet \;against}\times10+10$
- Goal status will be changed to "Failed".
- The creator of the goal will have to set an atonement post in his/her Settings page under "My Goals" section *(see more details in Settings page sub-section)*.
- Users who bet against this goal will be able to send messages to the creator of this goal in his/her Settings page under "My Bets" section *(see more details in Settings page sub-section)*.



> If the goal has been completed successfully, or expired (failed goal), the section to record the user's progress will be disabled and the buttons to bet against the goals will be disabled for other users.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-disabled-success.png?raw=true" alt="image-20210725142351804" style="zoom: 33%;" />

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-set-bet-disabled.png?raw=true" style="zoom: 33%;" />

<div style="page-break-after: always;"></div>

### Buddy System

> Click your profile picture at the navigation bar to be directed to your profile page.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-navbar-profile.png?raw=true" alt="punkt-navbar-profile" style="zoom: 33%;" />



#### <u>Buddy Request</u>

> Click the user profile picture at their post to be directed to their profile page.

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-post-user-profile.png?raw=true" alt="punkt-post-user-profile" style="zoom: 33%;" />



> At the User Profile page, you can 
>
> - see the user's basic information (ranking, productivity points, school, major, etc depending on what the user has input in his/her profile), 
> - recent activities, 
> - request him/her to be your buddy (if the other party no buddy at the moment) and 
> - follow the user if you want to see his/her posts.
>
> ** Initial productivity points of a user is 0 and initial ranking is #9999.*
>
> ** If you or the user for this profile page already have/has a buddy, you will not see the "Request Buddy" button.*

<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-profile.png?raw=true" alt="image-20210725142955868" style="zoom: 33%;" /> 



<img src="https://github.com/angkoonhwee/Punkt-Milestone3/blob/main/user-guide-img/punkt-profile-with-buddy.png?raw=true" alt="image-20210725143433651" style="zoom: 33%;" />

<div align = "center" > <em>E.g. this user has a buddy so you will not see the "Request Buddy" button</em></div>

> Buddy Request:
>
> - You can only send one buddy request at a time.
> - If you have sent a buddy request, you can only send another one after the requested user has rejected your request.
> - You can receive multiple requests from other users. 
> - If you received a buddy request, there will be a yellow badge shown on the 🔔 icon on the navigation bar. 

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725151442095.png" alt="image-20210725151442095" style="zoom: 33%;" />

> Once the other user has accepted your buddy request / you have accepted a buddy request, you two will be paired as buddy for 30 days. 
>
> Afterwards, you can click **"Buddy"** icon on the navigation bar or **"Chat with Buddy"** button on the right bar of the Main/Explore/Speculate page to be directed to the Buddy page.

<img src="/Users/xiaoyunwu/Desktop/punkt-navbar-buddy.png" alt="punkt-navbar-buddy" style="zoom: 33%;" />

<img src="/Users/xiaoyunwu/Documents/pic/punkt-chat-with-buddy.png" alt="image-20210725151636051" style="zoom: 33%;" />

<div style="page-break-after: always;"></div>

> At the right bar of the Buddy page, you can see:
>
> - your buddy's profile picture, 
> - your buddy's username, 
> - a progress bar showing the progress of the number of days you have been paired with your buddy, and
> - the number of days left (out of a total of 30 days) as a buddy pair.

<img src="/Users/xiaoyunwu/Documents/pic/punkt-buddy-info.png" alt="image-20210725152454559" style="zoom: 33%;" />

#### <u>Daily Todo</u>

> - Display today's todo items which you have set for yourself the previous day which you can check off when you have completed them, as well as those of your buddy's to check on each other's progress.
> - This list will also be displayed at the right bar under the section "Todos with Buddy" at the Main/Explore/Speculating page as shown previously.
> - If you do not complete your todo items by the end of the day, these todo items will be marked as late, and displayed as red.
>

<img src="/Users/xiaoyunwu/Documents/pic/punkt-buddy-daily.png" alt="image-20210725151715773" style="zoom: 33%;" />

#### <u>Set Todo</u>

> - Set your todo items for the next day.
> - Click Delete icon to delete that todo item.
> - Input your todo item and click ➕ button to add that todo item to your todo list. 
>

<img src="/Users/xiaoyunwu/Documents/pic/punkt-delete-todo.png" alt="punkt-delete-todo" style="zoom: 33%;" />

<div style="page-break-after: always;"></div>

#### <u>Live Chat</u>

> Chat with your buddy.
>
> <u>Note:</u>
>
> - There is a known bug of one sent messages being rendered multiple times in live chat which occurs on a random basis.
> - We attempted to rectify our code and tested for the bug again. Out of the 200 times we tested, we have not seen the bug anymore. 
> - However, as of now, we are unsure if the bug is truly rectified or just the probability of it happening is very low.
> - If you encountered this issue, you may refresh the page to render the messages correctly and use "Contact Us" form to notify us that the issue still exists. 

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725152100803.png" alt="image-20210725152100803" style="zoom: 33%;" />

<div style="page-break-after: always;"></div>

### Leaderboard

> Click 🏆 icon on the navigation bar to be directed to the Leaderboard page, where you can see the leading 50 users, ranked by their productivity points.
>
> ** Users with same productivity points will be ranked according to the time they created their account.*

<img src="/Users/xiaoyunwu/Desktop/punkt-leaderboard.png" alt="punkt-leaderboard" style="zoom: 33%;" />



<div style="page-break-after: always;"></div>

### Miscellaneous 

#### <u>User Settings</u>

> At the Settings page, you can edit your profile picture.
>
> - For "Curent Modules" field, after you have keyed in your module code/name, you need to press space/comma/enter to create a tag before saving.
> - For social media profile URL, copy paste the actual URL instead of just your username.

<img src="/Users/xiaoyunwu/Desktop/punkt-settings-profile.png" alt="punkt-settings-profile" style="zoom: 33%;" />

<img src="/Users/xiaoyunwu/Documents/pic/punkt-edit-profile.png" alt="image-20210725145707626" style="zoom: 33%;" />

> You can choose to see Goals, Bets and Buddy History by toggling the drop down button to the right of these titles.  

<img src="/Users/xiaoyunwu/Desktop/punkt-settings-table1.png" alt="punkt-settings-table1" style="zoom: 33%;" />



> If you have a failed goal, you need to create your atonement post here at your goal history table.
>
> - Upon clicking "Create" button, a modal with text area for recording your atonement post will pop up. 
> - Upon clicking "View" button, a modal with messages sent by users who bet against this goal will be shown.
> - You may click anywhere in the grey translucent background to close the modal.

<img src="/Users/xiaoyunwu/Desktop/punkt-goal-table.png" alt="punkt-goal-table" style="zoom: 33%;" />



<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725161923500.png" alt="image-20210725161923500" style="zoom: 33%;" />



<img src="/Users/xiaoyunwu/Documents/pic/punkt-failed-msg.png" alt="image-20210725162453548" style="zoom: 33%;" />



> After you have created your atonement post, "Create" button will be changed to "View", which you can click to go to the progress page of this goal with the atonement post.

<img src="/Users/xiaoyunwu/Documents/pic/punkt-atonement-post.png" alt="image-20210725181921741" style="zoom: 33%;" />



> If the goal you have bet against has failed, you can send some messages to the goal creator here by clicking "Reply" button.
>
> - *e.g. If the goal atonement were to treat users with bubble tea, perhaps you can leave your Paylah/PayNow number here 😉.*  
> - Only the goal creator can view these messages.

<img src="/Users/xiaoyunwu/Documents/pic/punkt-reply-failed.png" alt="image-20210725162316477" style="zoom: 33%;" />

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725162406322.png" alt="image-20210725162406322" style="zoom: 33%;" />

<div style="page-break-after: always;"></div>

#### <u>Profile Page Cover Picture</u>

> You can change your cover picture at your Profile page by clicking the cover picture to upload a new picture.

<img src="/Users/xiaoyunwu/Desktop/punkt-profile-cover.png" alt="punkt-profile-cover" style="zoom: 33%;" />



#### <u>Search for Friends</u>

> You can search for a friend by entering their username in the search bar on the navigation bar.
>
> - You can click on the username to go to their profile page.
> - You may clear the search bar field by clicking on the ╳ button.

<img src="/Users/xiaoyunwu/Documents/pic/punkt-search.png" alt="image-20210725154445452" style="zoom: 33%;" />



#### <u>Forgot Password</u>

> If you have forgotten your password, click "Forgot your password?" at the Login page.

<img src="/Users/xiaoyunwu/Desktop/punkt-forgot-pw.png" alt="punkt-forgot-pw" style="zoom: 33%;" />

> Enter your email to be given a link to reset your password in your inbox.
>
> If your email has been registered, you will receive an email to reset your password.
>
> - Note: this email may be sent to spam / promotions inbox.

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725153329348.png" alt="image-20210725153329348" style="zoom: 33%;" />

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725153536828.png" alt="image-20210725153536828" style="zoom: 33%;" />

> Click the link given in the email to be directed to the Reset Password Page.

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725153702302.png" alt="image-20210725153702302" style="zoom: 33%;" />

> If your password fulfils the requirements, you will receive an alert as well as an email showing that you have successfully reset your password. You may now login with the new password.

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725153812933.png" alt="image-20210725153812933" style="zoom: 33%;" />

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725160824297.png" alt="image-20210725160824297" style="zoom: 33%;" />



#### <u>Contact Us</u>

> If you have any enquiries, click **"Contact Us"** at the footer to send us your enquiries.
>
> - Fill in your name, email address (so that we can send reply to your email) as well as your enquiries.

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725150316879.png" alt="image-20210725150316879" style="zoom:50%;" />

<img src="/Users/xiaoyunwu/Library/Application Support/typora-user-images/image-20210725150339999.png" alt="image-20210725150339999" style="zoom: 33%;" />



<div align = "center"> <strong>END OF USER GUIDE</strong></div>





