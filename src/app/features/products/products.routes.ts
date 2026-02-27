import {Routes} from "@angular/router";
import {OnlineCasino} from "./online-casino/online-casino";


export const ProductsRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: ''},
    {path:'online-casino',component:OnlineCasino}

]