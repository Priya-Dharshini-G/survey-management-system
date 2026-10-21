package requestmodel;

import java.util.List;

public class CreateSurveyRequest {
    private int surveyCategoryId;
    private String name;
    private String description;
    private boolean userName;
    private boolean userNameReq;
    private boolean email;
    private boolean emailReq;
    private boolean dob;
    private boolean dobReq;
    private boolean phoneNo;
    private boolean phoneNoReq;
    private String status;
    private int userId;
    private List<SurveyQuestion> questions;

    public int getSurveyCategoryId() {
        return surveyCategoryId;
    }

    public void setSurveyCategoryId(int surveyCategoryId) {
        this.surveyCategoryId = surveyCategoryId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<SurveyQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<SurveyQuestion> questions) {
        this.questions = questions;
    }
}
