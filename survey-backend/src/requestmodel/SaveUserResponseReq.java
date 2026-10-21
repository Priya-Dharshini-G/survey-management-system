package requestmodel;

import java.util.ArrayList;
import java.util.List;

import model.ResponsedQuestions;

public class SaveUserResponseReq {
    private int surveyId;
    private String name;
    private String emailId;
    private String dob;
    private String phoneNo;
    private List<ResponsedQuestions> questions = new ArrayList<ResponsedQuestions>();

    public int getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(int surveyId) {
        this.surveyId = surveyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public List<ResponsedQuestions> getQuestions() {
        return questions;
    }

    public void setQuestions(List<ResponsedQuestions> questions) {
        this.questions = questions;
    }
}
