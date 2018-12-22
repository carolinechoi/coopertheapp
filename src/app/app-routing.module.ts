import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'home/:id', loadChildren: './home/home.module#HomePageModule'},
  { path: 'landing', loadChildren: './landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'add-list', loadChildren: './add-list/add-list.module#AddListPageModule' },
  { path: 'clicked-list/:name/:color', loadChildren: './clicked-list/clicked-list.module#ClickedListPageModule' },
  { path: 'add-bullet/:name/:color', loadChildren: './add-bullet/add-bullet.module#AddBulletPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
