#### step - 1: `D:\Auth_project\api> npm init -y`
#### step - 2: `D:\Auth_project\api> npm i express`
#### step - 3: `D:\Auth_project\api> npm i mongoose`
#### step - 4: `D:\Auth_project\api> npm i dotenv`
#### step - 5: `D:\Auth_project\api> npm i nodemon`

### Problem: 
```python
import express from 'express';
^^^^^^
SyntaxError: Cannot use import statement outside a module 
```

- Fix: `require('express')`
But we are using something latest so we will fix it like this:
- In the `package.json` we have to insert `"type" : "module"` 
- By defalut it was `"type" : "commonjs"`

### we can check connection using the following code @`localhost:8800`
```javascript
app.use('/', (req, res) =>{
    return res.send("Hello, welcome to MEAN Stack")
})

app.listen(8800, ()=>{
    console.log("Connected to backend");
})
```

#### As we do not want to run the code every time we make some change, we need to configure hot reload. So we are using nodemon package here. We have to configure the `package.json` file like this
```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
```

#### Step - 6: Configure dotenv and mongodb
