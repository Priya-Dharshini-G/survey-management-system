package requestmodel;

import java.util.List;

/**
 * SurveyQuestion
 */
public class SurveyQuestion {
    private String question;
    private String type;
    private boolean isrequired;
    private int rate;
    private List<Option> options;

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

    public boolean isIsrequired() {
        return isrequired;
    }

    public void setIsrequired(boolean isrequired) {
        this.isrequired = isrequired;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }
}
