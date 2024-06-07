import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { UserTableComponent } from "./components/user-table/user-table.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";

const routes:Routes = [
    {
        path:'',
        component: UserTableComponent
    }, 
    {
        path:'create-user',
        component: CreateUserComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}