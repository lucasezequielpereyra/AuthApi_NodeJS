import Role from '../models/Role';

export const verifyRolesExist = async (req, res, next) => {
  try {
    if (req.body.roles) {
      const roles = await Role.find({});
      let arrayRoles = [];

      roles.map(rol => arrayRoles.push(rol.name));

      for (let i = 0; i < req.body.roles.length; i++) {
        if (!arrayRoles.includes(req.body.roles[i])) {
          return res.status(400).json({
            message: `Role ${req.body.roles[i]} does not exist`,
          });
        }
      }
      next();
    }
  } catch (error) {
    console.error(error);
  }
};

export const verifiyUsernameExist = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const businessNameExist = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const verifiyEmailExist = async (req, res, next) => {
  try {
  } catch (error) {}
};
