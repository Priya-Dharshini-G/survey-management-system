package model;

import java.util.ArrayList;
import java.util.List;

public class Survey {
    private int id;
    private String name;
    private String description;
    private int statusId;
    private boolean userName;
    private boolean userNameReq;
    private boolean email;
    private boolean emailReq;
    private boolean dob;
    private boolean dobReq;
    private boolean phoneNo;
    private boolean phoneNoReq;
    private String created_at;
    private int responseCount;
    private List<SurveyQuestions> questions = new ArrayList<SurveyQuestions>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public boolean isUserName() {
        return userName;
    }

    public void setUserName(boolean userName) {
        this.userName = userName;
    }

    public boolean isUserNameReq() {
        return userNameReq;
    }

    public void setUserNameReq(boolean userNameReq) {
        this.userNameReq = userNameReq;
    }

    public boolean isEmail() {
        return email;
    }

    public void setEmail(boolean email) {
        this.email = email;
    }

    public boolean isEmailReq() {
        return emailReq;
    }

    public void setEmailReq(boolean emailReq) {
        this.emailReq = emailReq;
    }

    public boolean isDob() {
        return dob;
    }

    public void setDob(boolean dob) {
        this.dob = dob;
    }

    public boolean isDobReq() {
        return dobReq;
    }

    public void setDobReq(boolean dobReq) {
        this.dobReq = dobReq;
    }

    public boolean isPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(boolean phoneNo) {
        this.phoneNo = phoneNo;
    }

    public boolean isPhoneNoReq() {
        return phoneNoReq;
    }

    public void setPhoneNoReq(boolean phoneNoReq) {
        this.phoneNoReq = phoneNoReq;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public List<SurveyQuestions> getQuestions() {
        return questions;
    }

    public void setQuestions(List<SurveyQuestions> questions) {
        this.questions = questions;
    }

    public int getResponseCount() {
        return responseCount;
    }

    public void setResponseCount(int responseCount) {
        this.responseCount = responseCount;
    }
}
