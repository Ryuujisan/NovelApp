import User from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        let {name, email, firebaseUserId} = req.body;
        email = email.toLowerCase();
        const user = await User.create({name, email, fbID: firebaseUserId});

        await user.save();

        res.status(201).json({user: user});
    }catch (err) {
        res.status(400).json({msg: "error", error: err});
    }
};

export const login = async (req, res, next) => {
    try {
        let {usingProvider} = req.body;
        const id = req.user.user_id;
        let UserDb = await User.findOne({fbID: id});
        if(!UserDb && usingProvider){
            UserDb = await User.create({name, email, fbID:firebaseUserId});
            await user.save();
        }

        return res.status(200).json({user: UserDb})
    } catch (error) {
        return res.status(400).json({msg: "error", error: error});
    }
};

export const check = async (req, res, next) => {
  const token = req.user;

  try {
      const user = await User.findOne({ fbID: token.user_id });
      if (!user) {
          return res.status(400).json({msg: "user does not exist"});
      }
     return  res.status(200).json({user : user});
  } catch (error) {
      return res.status(500).json({msg: "Server internal error", error: error});
  }
};