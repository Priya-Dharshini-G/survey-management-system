package responsemodel;

import java.util.ArrayList;
import java.util.List;

public class ResponseUsersRes {
    private int id;
    private String name;
    private String emailId;
    private String dob;
    private String phoneNo;
    private List<ResponsedQuestionsRes> questions = new ArrayList<ResponsedQuestionsRes>();

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

    public List<ResponsedQuestionsRes> getQuestions() {
        return questions;
    }

    public void setQuestions(List<ResponsedQuestionsRes> questions) {
        this.questions = questions;
    }
}
