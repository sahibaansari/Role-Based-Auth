Role Based Autherization 
Auth :
api/auth/register
api/auth/login

User Route:
api/user/admin
api/user/manager
api/user/user


Role                  Routes
admin                 api/user/admin
                      api/user/manager
                      api/user/user

manager               api/user/manager
                      api/user/user

user                  api/user/user



middlerware for verifytoken

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user info
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};




middleware to based on the role based 
const authorizedRoles=(...allowedRoles)=>{
return (req,res,next)=>{
  if(!allowedRoles.includes(req.user.role)){
    return res.status(403).json({message:"access denied"});
  }
  next();
}

}



