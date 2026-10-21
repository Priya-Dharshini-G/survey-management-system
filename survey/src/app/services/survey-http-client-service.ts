import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post('http://localhost:8080/api/getAllCategory', data);
  }
  /**
   * Method which is used to create the category.
   */
  createCategory(data: any) {
    return this.http.post('http://localhost:8080/api/createCategory', data);
  }
  /**
   * Method which is used to update the category.
   */
  updateCategory(data: any) {
    return this.http.post('http://localhost:8080/api/updateCategory', data);
  }
  /**
   * Method which is used to delete the category.
   */
  deleteCategory(data: any) {
    return this.http.post('http://localhost:8080/api/deleteCategory', data);
  }
  /**
   * Method which is used to get a specific category.
   */
  getOneCategory(data: any) {
    return this.http.post('http://localhost:8080/api/getOneCategory', data);
  }
  /**
   * Method which is used to get all survey.
   */
  getAllSurvey(data: any) {
    return this.http.post('http://localhost:8080/api/getAllSurvey', data);
  }
  /**
   * Method which is used to get the specific survey.
   */
  getSurvey(data: any) {
    return this.http.post('http://localhost:8080/api/getSurvey', data);
  }
  /**
   * Method which is used to create the survey.
   */
  createSurvey(data: any) {
    return this.http.post('http://localhost:8080/api/createSurvey', data);
  }
  /**
   * Method which is used to update the survey.
   */
  updateSurvey(data: any) {
    return this.http.post('http://localhost:8080/api/updateSurvey', data);
  }
  /**
   * Method which is used to delete the survey.
   */
  deleteSurvey(data: any) {
    return this.http.post('http://localhost:8080/api/deleteSurvey', data);
  }
  /**
   * Method which is used to get the response option.
   */
  getResponseOptions(data: any) {
    return this.http.post('http://localhost:8080/api/getAllOptionSetting', data);
  }
  /**
   * Method which is used to create the response option.
   */
  createResponseOptions(data: any) {
    return this.http.post('http://localhost:8080/api/createOptionSetting', data);
  }
  /**
   * Method which is used to update the response option.
   */
  updateResponseOptions(data: any) {
    return this.http.post('http://localhost:8080/api/updateOptionSetting', data);
  }
  /**
   * Method which is used to delete the response option.
   */
  deleteResponseOptions(data: any) {
    return this.http.post('http://localhost:8080/api/deleteOptionSetting', data);
  }
  /**
   * Method which is used to get all groups.
   */
  getAllGroups(data: any) {
    return this.http.post('http://localhost:8080/api/getAllGroups', data);
  }
  /**
   * Method which is used to create the groups.
   */
  createGroups(data: any) {
    return this.http.post('http://localhost:8080/api/createGroups', data);
  }
  /**
   * Method which is used to update the groups.
   */
  updateGroups(data: any) {
    return this.http.post('http://localhost:8080/api/updateGroups', data);
  }
  /**
   * Method which is used to delete the groups.
   */
  deleteGroups(data: any) {
    return this.http.post('http://localhost:8080/api/deleteGroups', data);
  }
  /**
   * Method which is used to save the survey response.
   */
  saveSurveyResposne(data: any) {
    return this.http.post('http://localhost:8080/api/saveSurveyResposne', data);
  }
  /**
   * Method which is used to get survey response.
   */
  getSurveyResponse(data: any) {
    return this.http.post('http://localhost:8080/api/getSurveyResponse', data);
  }
  /**
   * Method which is used to change the status of the survey.
   */
  changeStatus(data: any) {
    return this.http.post('http://localhost:8080/api/changeStatus', data);
  }
  /**
   * Method which is used to change the status of the survey.
   */
  checkEmail(data: any) {
    return this.http.post('http://localhost:8080/api/checkEmail', data);
  }
  /**
   * Method which is used to change the status of the survey.
   */
  changePassword(data: any) {
    return this.http.post('http://localhost:8080/api/changePassword', data);
  }
}
