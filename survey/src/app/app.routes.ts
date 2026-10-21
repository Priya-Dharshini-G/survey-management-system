import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';
import { SurveyCategories } from './component/survey-categories/survey-categories';
import { SurveyList } from './component/survey-list/survey-list';
import { CreateSurvey } from './component/create-survey/create-survey';
import { Setting } from './component/setting/setting';
import { GroupsSetting } from './component/groups-setting/groups-setting';
import { ResponseSetting } from './component/response-setting/response-setting';
import { CreateCategory } from './component/create-category/create-category';
import { Login } from './auth/components/login/login';
import { Signup } from './auth/components/signup/signup';
import { ForgotPassword } from './auth/components/forgot-password/forgot-password';
import { authGuard } from './auth/guards/auth-guard';
import { Survey } from './component/survey/survey';
import { UserResponse } from './component/user-response/user-response';
import { ViewResponse } from './component/view-response/view-response';
import { ChangePassword } from './auth/components/change-password/change-password';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'sign-up', component: Signup },
  { path: 'forgot-password', component: ForgotPassword },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'survey-categories', pathMatch: 'full' },
      { path: 'survey-categories', component: SurveyCategories },
      { path: 'survey-categories/create', component: CreateCategory },
      { path: 'survey-categories/edit/:id', component: CreateCategory },
      { path: 'survey-categories/:id', component: SurveyList },
      {
        path: 'survey',
        component: Survey,
        children: [
          { path: '', redirectTo: 'create/:id', pathMatch: 'full' },
          { path: 'create/:id', component: CreateSurvey },
          { path: 'edit/:categoryId/:surveyId', component: CreateSurvey },
        ],
      },
      {
        path: 'setting',
        component: Setting,
        children: [
          { path: '', redirectTo: 'group-setting', pathMatch: 'full' },
          { path: 'group-setting', component: GroupsSetting },
          { path: 'response-setting', component: ResponseSetting },
        ],
      },
    ],
  },
  { path: 'survey/user-response/:id', component: UserResponse },
  { path: 'survey/view-response/:id', component: ViewResponse },
  { path: 'change-password/:emailId', component: ChangePassword },
];
