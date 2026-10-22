import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SurveyHttpClientService {
  /**
   * @param http holds the HttpClient class instance.
   */
  constructor(private http: HttpClient) {}
  /**
   * Method which is used to get all category.
   */
  getAllCategory(data: any) {
    return this.http.post(`${environment.apiUrl}/getAllCategory`, data);
  }
  /**
   * Method which is used to create the category.
   */
  createCategory(data: any) {
    return this.http.post(`${environment.apiUrl}/createCategory`, data);
  }
  /**
   * Method which is used to update the category.
   */
  updateCategory(data: any) {
    return this.http.post(`${environment.apiUrl}/updateCategory`, data);
  }
  /**
   * Method which is used to delete the category.
   */
  deleteCategory(data: any) {
    return this.http.post(`${environment.apiUrl}/deleteCategory`, data);
  }
  /**
   * Method which is used to get a specific category.
   */
  getOneCategory(data: any) {
    return this.http.post(`${environment.apiUrl}/getOneCategory`, data);
  }
  /**
   * Method which is used to get all survey.
   */
  getAllSurvey(data: any) {
    return this.http.post(`${environment.apiUrl}/getAllSurvey`, data);
  }
  /**
   * Method which is used to get the specific survey.
   */
  getSurvey(data: any) {
    return this.http.post(`${environment.apiUrl}/getSurvey`, data);
  }
  /**
   * Method which is used to create the survey.
   */
  createSurvey(data: any) {
    return this.http.post(`${environment.apiUrl}/createSurvey`, data);
  }
  /**
   * Method which is used to update the survey.
   */
  updateSurvey(data: any) {
    return this.http.post(`${environment.apiUrl}/updateSurvey`, data);
  }
  /**
   * Method which is used to delete the survey.
   */
  deleteSurvey(data: any) {
    return this.http.post(`${environment.apiUrl}/deleteSurvey`, data);
  }
  /**
   * Method which is used to get the response option.
   */
  getResponseOptions(data: any) {
    return this.http.post(`${environment.apiUrl}/getAllOptionSetting`, data);
  }
  /**
   * Method which is used to create the response option.
   */
  createResponseOptions(data: any) {
    return this.http.post(`${environment.apiUrl}/createOptionSetting`, data);
  }
  /**
   * Method which is used to update the response option.
   */
  updateResponseOptions(data: any) {
    return this.http.post(`${environment.apiUrl}/updateOptionSetting`, data);
  }
  /**
   * Method which is used to delete the response option.
   */
  deleteResponseOptions(data: any) {
    return this.http.post(`${environment.apiUrl}/deleteOptionSetting`, data);
  }
  /**
   * Method which is used to get all groups.
   */
  getAllGroups(data: any) {
    return this.http.post(`${environment.apiUrl}/getAllGroups`, data);
  }
  /**
   * Method which is used to create the groups.
   */
  createGroups(data: any) {
    return this.http.post(`${environment.apiUrl}/createGroups`, data);
  }
  /**
   * Method which is used to update the groups.
   */
  updateGroups(data: any) {
    return this.http.post(`${environment.apiUrl}/updateGroups`, data);
  }
  /**
   * Method which is used to delete the groups.
   */
  deleteGroups(data: any) {
    return this.http.post(`${environment.apiUrl}/deleteGroups`, data);
  }
  /**
   * Method which is used to save the survey response.
   */
  saveSurveyResposne(data: any) {
    return this.http.post(`${environment.apiUrl}/saveSurveyResposne`, data);
  }
  /**
   * Method which is used to get survey response.
   */
  getSurveyResponse(data: any) {
    return this.http.post(`${environment.apiUrl}/getSurveyResponse`, data);
  }
  /**
   * Method which is used to change the status of the survey.
   */
  changeStatus(data: any) {
    return this.http.post(`${environment.apiUrl}/changeStatus`, data);
  }
  /**
   * Method which is used to change the status of the survey.
   */
  checkEmail(data: any) {
    return this.http.post(`${environment.apiUrl}/checkEmail`, data);
  }
  /**
   * Method which is used to change the status of the survey.
   */
  changePassword(data: any) {
    return this.http.post(`${environment.apiUrl}/changePassword`, data);
  }
}
