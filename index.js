const express = require("express");
const { sequelize, User, Attendance, Times, Leaves } = require("./models");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Users
app.post("/adduser", async (req, resp) => {
  try {
    const users = await User.create(req.body);
    resp.json(users);
  } catch (err) {
    resp.json(err);
  }
});

app.post("/getuser", async (req, resp) => {
  try {
    const users = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });
    resp.send(users);
  } catch (err) {
    resp.json(err);
  }
});

//you need to work here 
app.put("/update/:uid", async (req, resp) => {
  const uuid = req.params.uid;
  try {
    const users = await User.findOne({
      where: {
        uuid: uuid,
      },
    });
    users.name = req.body.name;
    await users.save();

    resp.json(users);
  } catch (err) {
    resp.json(err);
  }
});

app.delete("/delete/:uid", async (req, resp) => {
  try {
    const users = await User.findOne({
      where: {
        uuid: req.params.uid,
      },
    });
    await users.destroy();
    resp.json({ msg: `Id ${req.params.uid} deleted` });
  } catch (err) {
    resp.json(err);
  }
});

// atendences
app.get("/getAttendence", async (req, resp) => {
  try {
    const attendence = await Attendance.findAll({
      include: [Times],
    });
    resp.send(attendence);
  } catch (err) {
    resp.json(err);
  }
});

app.post("/addAttendence", async (req, resp) => {
  try {
    const attendence = await Attendance.create(req.body);
    await Times.create({
      time: req.body.time,
      attendance_id: attendence.id
    })
    resp.send("Data Saved");
  } catch (err) {
    resp.json(err);
  }
});

// times
app.post("/addTime", async (req, resp) => {
  try {
    const time = await Times.create(req.body);
    resp.send(time);
  } catch (err) {
    resp.json(err);
  }
});

// leave
app.post("/addleave", async (req, resp) => {
  try {
    const leave = await Leaves.create(req.body);
    resp.json(leave);
  } catch (err) {
    resp.json(err);
  }
});
app.get("/getleave", async (req, resp) => {
  try {
    const leave = await Leaves.findOne({
      where: {
        note: req.body.note
        // email:req.body.email,
        // password: req.body.password
      }
    });
    resp.send(leave);
  } catch (err) {
    resp.json(err);
  }
});


// server
app.listen(3012, async () => {
  console.log(`server running on port 3000`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});   