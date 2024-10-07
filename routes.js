const express = require('express'); 
const verifyToken = require('./controller/Middleware/Authorization');
const { changePassword } = require('./controller/ChangePassword');
const { login } = require('./controller/Auth/Login');
const { logout } = require('./controller/Auth/Logout');
const { signup } = require('./controller/Auth/Signup');
const { sessioncontroller } = require('./controller/Auth/Session_Controller');
// const { auth } = require('./controller/Middleware/Auth')
const {getUserData} = require('./controller/Auth/Getinguserdata');
const {getUserSessionData} = require('./controller/Auth/Getinguserdata2');
const { totalCount } = require('./controller/Auth/Totalcount');
const { pages } = require('./controller/Auth/Pages');
const { userdata} = require('./controller/Auth/Userdata');
const {fetchingdata} = require('./controller/Auth/Fetchingdata');
const {updateddata} = require('./controller/Auth/Updateddata');
const {totalRoleSystem} = require('./controller/Auth/Rolefetch');
const {systemRoleSearch} = require('./controller/Auth/Rolesearch');
const {assignrole} = require('./controller/Auth/Assignrole');
const {assignVariousRoles} = require('./controller/Auth/AssignVariousRoles');
const {addRole} = require('./controller/Auth/Roles');
const { deleteRole } = require('./controller/Auth/Delroles'); 
const { updateRole } = require('./controller/Auth/Updateroles'); 
const { getRoleModules } = require('./controller/Auth/Getroles_modules'); 
const { addModule} = require('./controller/Auth/Modulesadd'); 
const { moduledel } = require('./controller/Auth/Modulesdel'); 
const { editModule } = require('./controller/Auth/Modulesedit'); 
const { getModule } = require('./controller/Auth/Modulesget'); 
const { mulroleid } = require('./controller/Auth/Rolesid_modid'); 
const { totalmodule } = require('./controller/Auth/Modulestotal'); 
const { modulesearch } = require('./controller/Auth/Modulesearch'); 
const {systemUser} =require('./controller/Auth/Systemuser');
const {totalCountSystem} =require('./controller/Auth/Totalcountsystem');
const {graphAPI} =require('./controller/Auth/graphAPI');
const router = express.Router();

router.post("/ChangePassword",changePassword);  
router.post("/Login",login);
router.post("/Signup", signup);
router.post("/Assignrole", assignrole);
router.post("/AssignVariousRoles", assignVariousRoles);
router.post("/addrole", addRole);
router.post("/addmodule", addModule);
router.post("/mulroleid", mulroleid);
router.delete("/deleteRole/:id", deleteRole);
router.delete("/moduledel/:id", moduledel);
router.get("/Session_Controller", sessioncontroller);
router.get("/Logout", logout);
router.get("/getmodule/:moduleId", getModule);
router.get('/user/list',pages); 
router.get('/totalcount', totalCount);
router.get('/datauser',userdata);
router.get("/user/fetchdetails",fetchingdata);
router.get('/system/role/count',totalRoleSystem);
router.get('/system/role/list',systemRoleSearch);
router.get('/system/user/count',totalCountSystem);
router.get("/system/user/list",systemUser);
router.get('/system/module/count',totalmodule);
router.get('/system/module/list',modulesearch);
router.get('/role-modules/:roleId',getRoleModules);
router.put("/user/updated",updateddata);
router.put("/updaterole/:id",updateRole);
router.put('/edit/:moduleId', editModule);
router.get('/graph-api/:user_login_id',graphAPI);
router.get("/getUserData/:id", getUserData);
router.get("/getUserSessionData/:id", getUserSessionData);

// Protected routes with verifyToken middleware

router.get('/UserList2', verifyToken);
router.get('/profiledata', verifyToken);
router.get('/changePassword', verifyToken);
router.get('/UsersList', verifyToken);



module.exports = router;