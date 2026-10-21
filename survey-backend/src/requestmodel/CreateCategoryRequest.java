package requestmodel;

import java.util.List;

public class CreateCategoryRequest {

    private int userId;
    private String name;
    private String description;
    private List<Question> questions;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getUserId() {
        return userId;
    }

    public List<Question> getQuestions() {
        return questions;
    }
}
