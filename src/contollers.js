export const create_user = ({ bodymen: { body }, params, user }, res, next) => {
  let findParams = { email: body.email }
  let { email, name, date, taluka , city , state , country,password } = body
  let update_parent=parent.split(",")
  User.findOne(findParams)
    .then(user_data => {
      if (user_data) throw { msg: "user already exist" };
      let passwordHash = crypto
        .createHmac("sha512", hashSalt)
        .update(password)
        .digest("hex");
      User.create({ email, name, password: passwordHash, city, taluka, country, state, date })
        .then(createdUser => {
          console.log("User created", createdUser)
          res.status(201).json(createdUser.view(false))
        })
        .catch(err => {
          console.log("in error", err);
          let errObj = err.hasOwnProperty("msg")
            ? err
            : { msg: "some error occurred" };
          res.status(500).json(errObj);
        })
    })
    .catch(err => {
      console.log("in error", err);
      let errObj = err.hasOwnProperty("msg")
        ? err
        : { msg: "some error occurred" };
      res.status(500).json(errObj);
    })
}