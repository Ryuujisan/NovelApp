export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        email = email.toLowerCase();
        await User.validate({name, email, password}, (err, user) => {

        })

        const user = await User.create({name, email, password});



    }catch (err) {
        res.status(400).json({msg: "error"});
    }
};

export const login = async (req, res) => {

};

export const checkAuth = async (req, res) => {
  const body = req.body;
  const token = req.user;

  try {

  }
};