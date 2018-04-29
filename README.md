# fb-chat-emulator

### Documentation
I re-write [this module](https://github.com/Schmavery/facebook-chat-api) to learn, you can goto [here](https://github.com/Schmavery/facebook-chat-api#documentation) to read documentation of that module.
Thank you so much [Schmavery](https://github.com/Schmavery/)

### Feature
This module will auto online 24/24 and "seen" if somebody send you any message.
Run test.js to auto send typing when they are typing to you.

### Usage
Change in `test.js`
- In first time, you should login with email and password with [this code](https://github.com/Hongarc/fb-chat-emulator/blob/b5ce0af79f509b121f30c2745e68f821fce829f6/test.js#L10):
```
let user = {email: 'your username/id', pass: 'your pass'};
```
- When you logged in, use [this code](https://github.com/Hongarc/fb-chat-emulator/blob/b5ce0af79f509b121f30c2745e68f821fce829f6/test.js#L21) to save cookie:
````
fs.writeFileSync('state.json', JSON.stringify(api.getAppState()));
````
- Now, you can login with cookie with file `state.json` [here](https://github.com/Hongarc/fb-chat-emulator/blob/b5ce0af79f509b121f30c2745e68f821fce829f6/test.js#L15):
````
user = {appState: JSON.parse(fs.readFileSync('state.json', 'utf8'))};
````
or use environment variable to login [here](https://github.com/Hongarc/fb-chat-emulator/blob/b5ce0af79f509b121f30c2745e68f821fce829f6/test.js#L11):
````
user = process.env.user
````

### Deploy with Heroku
You should create some environment variable :
- `user`: variable to login and don't show in source (recommend).
- `TIME_IDLING`: timeout request to your server.
- `URL_NEXT`: url of next server (if you want exit and turn on other server).
- `DAY_TO_DIE`: set date of month to close your process and change other server.
- `LOG_TIMEOUT`: timeout to send log file.
- `LOG_THREAD_ID`: id of user receive file log.
