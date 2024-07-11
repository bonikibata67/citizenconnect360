import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthInterface } from "../reducers/auth.reducers";


const authselectorFeature = createFeatureSelector<AuthInterface>('auth')


export const errorSelector= createSelector(authselectorFeature, (state)=>state.loginErrorMessage)