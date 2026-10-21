package requestmodel;

import java.util.List;

import model.DefaultQuestions;

public class UpdateSurveyCategoryReq {
    private int id;
    private String name;
    private String description;
    private List<DefaultQuestions> questions;
    private List<DefaultQuestions> deletedQuestions;

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

    public List<DefaultQuestions> getQuestions() {
        return questions;
    }

    public void setQuestions(List<DefaultQuestions> questions) {
        this.questions = questions;
    }

    public List<DefaultQuestions> getDeletedQuestions() {
        return deletedQuestions;
    }

    public void setDeletedQuestions(List<DefaultQuestions> deletedQuestions) {
        this.deletedQuestions = deletedQuestions;
    }
}
