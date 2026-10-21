package model;

import java.util.ArrayList;
import java.util.List;

public class SurveyQuestions {
    private int id;
    private String question;
    private String type;
    private int rate;
    private boolean isrequired;
    private List<Options> options = new ArrayList<Options>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public boolean getIsrequired() {
        return isrequired;
    }

    public void setIsrequired(boolean isrequired) {
        this.isrequired = isrequired;
    }

    public List<Options> getOptions() {
        return options;
    }

    public void setOptions(List<Options> options) {
        this.options = options;
    }
}
