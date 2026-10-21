package requestmodel;

import java.util.ArrayList;
import java.util.List;

import model.SurveyQuestions;

public class UpdateSurveyReq {
    private int id;
    private String name;
    private String description;
    private String status;
    private boolean userName;
    private boolean userNameReq;
    private boolean email;
    private boolean emailReq;
    private boolean dob;
    private boolean dobReq;
    private boolean phoneNo;
    private boolean phoneNoReq;
    private List<SurveyQuestions> questions = new ArrayList<SurveyQuestions>();
    private List<IdReq> deletedQuestions = new ArrayList<IdReq>();
    private List<IdReq> deletedOptions = new ArrayList<IdReq>();

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public List<SurveyQuestions> getQuestions() {
        return questions;
    }

    public void setQuestions(List<SurveyQuestions> questions) {
        this.questions = questions;
    }

    public List<IdReq> getDelQuestions() {
        return deletedQuestions;
    }

    public void setDelQuestions(List<IdReq> deletedQuestions) {
        this.deletedQuestions = deletedQuestions;
    }

    public List<IdReq> getDeletedOptions() {
        return deletedOptions;
    }

    public void setDeletedOptions(List<IdReq> deletedOptions) {
        this.deletedOptions = deletedOptions;
    }
}
