import { Router } from "express";
import {AddView, ViewsController } from "../controllers/viewscontroller";
import { verifyToken } from "../middlewares";
import { ensureRoles } from "../ensureroles";


const viewsController = new ViewsController();
const viewsroutes = Router();

viewsroutes.post("/", AddView);
viewsroutes.get("/", viewsController.getViews);





export default viewsroutes;


