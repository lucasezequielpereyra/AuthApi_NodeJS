import User from '../models/User';
import Role from '../models/Role';

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map(role => role._id);
    } else {
      const role = await Role.findOne({ name: 'default' });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Created User ' + savedUser.username });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
};

export const getUsersById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  return res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, roles } = req.body;
  let foundRoles;
  /*  Search Roles  */
  if (roles) {
    foundRoles = await Role.find({ name: { $in: roles } });
  }

  await User.findOneAndUpdate(
    { _id: id },
    {
      username: username,
      email: email,
      password: await User.encryptPassword(password),
      roles: foundRoles,
    },
  );
  return res.status(201).json('updated user');
};
