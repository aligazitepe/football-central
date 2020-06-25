// REMOVE-START
const bcrypt = require('bcrypt');
const User = require('./../models/User');
const fs = require('fs');
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline)
// REMOVE-END

const create = async (req, res) => {
  // REMOVE-START
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({
    ...req.body,
    password: hash,
  });
  try {
    const user = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
  // REMOVE-END
};

const login = async (req, res) => {
  // REMOVE-START
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    req.session.uid = user._id;
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
  // REMOVE-END
};

const profile = async (req, res) => {
  // REMOVE-START
  try {
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(201).send(user);
  } catch(error) {
    res.status(404).send({ error, message: 'User not found' });
  }
  // REMOVE-END
};

const logout = (req, res) => {
  // REMOVE-START
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
  // REMOVE-END
};


const createUpload = async (req, res, next) => {

  const { 
    file, 
    body: {name}
  } = req;

  if (file.detectedFileExtension != ".jpg") next(new Error("invalid file type"));
  const fileName = name +  Math.floor(Math.random() * 1000) + ".jpg" ;
  await pipeline(
    file.stream,
     fs.createWriteStream(`${__dirname}/../../public/images/${fileName}`)
     
     
     );
res.send("File uploaded as " + fileName)
};


module.exports = { create, login, profile, logout, createUpload };
// create write stream let writer = fs.createWriteStream(path)
// writer.write(whatever data)
// writer.end
