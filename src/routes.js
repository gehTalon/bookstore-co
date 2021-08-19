
import UserProfile from "views/UserProfile.js";
import Library from "views/Library.js";
import Books from "views/Books.js";


const dashboardRoutes = [
  
 
 
  {
    path: "/library",
    name: "Libraries",
    icon: "nc-icon nc-notes",
    component: Library,
    layout: "/admin",
  },
  {
    path: "/books",
    name: "Books",
    icon: "nc-icon nc-paper-2",
    component: Books,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Renters",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
 
];

export default dashboardRoutes;
