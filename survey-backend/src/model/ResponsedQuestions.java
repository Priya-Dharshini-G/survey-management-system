package model;

public class ResponsedQuestions {
    private int id;
    private int responseusersId;
    private int questionId;
    private String answer;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getResponseusersId() {
        return responseusersId;
    }

    public void setResponseusersId(int responseusersId) {
        this.responseusersId = responseusersId;
    }

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

}
