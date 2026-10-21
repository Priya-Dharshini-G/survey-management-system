package responsemodel;

import java.util.ArrayList;
import java.util.List;

import model.Options;

/**
 * ResponsedQuestionsRes
 */
public class ResponsedQuestionsRes {
    private int questionId;
    private String answer;
    private String question;
    private int rate;
    private String type;
    private List<Options> options = new ArrayList<Options>();

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Options> getOptions() {
        return options;
    }

    public void setOptions(List<Options> options) {
        this.options = options;
    }

}
