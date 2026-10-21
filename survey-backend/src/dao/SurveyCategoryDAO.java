package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import model.DefaultQuestions;
import model.Options;
import model.ResponsedQuestions;
import model.Survey;
import model.SurveyCategory;
import model.SurveyQuestions;
import requestmodel.ChangePasswordReq;
import requestmodel.ChangeStatusReq;
import requestmodel.CreateCategoryRequest;
import requestmodel.CreateSurveyRequest;
import requestmodel.GetSurveyReq;
import requestmodel.IdReq;
import requestmodel.Option;
import requestmodel.Question;
import requestmodel.SaveUserResponseReq;
import requestmodel.SurveyCategoryRequest;
import requestmodel.SurveyQuestion;
import requestmodel.UpdateSurveyCategoryReq;
import requestmodel.UpdateSurveyReq;
import responsemodel.EmailExistsRes;
import responsemodel.GetCategoryRes;
import responsemodel.ResponseUsersRes;
import responsemodel.ResponsedQuestionsRes;
import util.DBConnection;

public class SurveyCategoryDAO {
    public List<SurveyCategory> getAllCategory(SurveyCategoryRequest reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        SurveyCategory category = null;
        List<SurveyCategory> categoryList = new ArrayList<SurveyCategory>();
        String sql = "SELECT * from surveycategory where userId is NULL or userId=? ORDER BY id ASC";
        System.out.println(sql);
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, reqData.getUserId());
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            category = new SurveyCategory();
            category.setId(rs.getInt("id"));
            category.setUserId(rs.getInt("userId"));
            category.setName(rs.getString("name"));
            category.setDescription(rs.getString("description"));
            categoryList.add(category);
        }
        rs.close();
        ps.close();
        con.close();
        return categoryList;
    }

    public GetCategoryRes getOneCategory(IdReq reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        GetCategoryRes category = null;
        String sql = "SELECT c.id, c.name, c.description, q.id, q.question from surveycategory as c left join defaultquestions as q on c.id = q.surveyCategoryId where c.id=?";
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, reqData.getId());
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            if (category == null) {
                category = new GetCategoryRes();
                category.setId(rs.getInt(1));
                category.setName(rs.getString(2));
                category.setDescription(rs.getString(3));
            }
            DefaultQuestions question = new DefaultQuestions();
            question.setId(rs.getInt(4));
            question.setQuestion(rs.getString(5));
            if (question.getId() != 0) {
                category.getQuestions().add(question);

            }
        }
        rs.close();
        ps.close();
        con.close();
        return category;
    }

    public void createCategory(CreateCategoryRequest payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            int row = 0;
            String sql = "INSERT INTO surveycategory (name,description,userId) values(?,?,?)";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, payload.getName());
            ps.setString(2, payload.getDescription());
            ps.setInt(3, payload.getUserId());
            row = ps.executeUpdate();
            if (row >= 1) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    int categoryId = rs.getInt(1);
                    System.out.println("Inserted ID: " + categoryId);
                    String questionSql = "INSERT INTO defaultquestions(surveyCategoryId, question) VALUES (?, ?)";
                    PreparedStatement questionPs = con.prepareStatement(questionSql);
                    for (Question q : payload.getQuestions()) {
                        questionPs.setInt(1, categoryId);
                        questionPs.setString(2, q.getQuestion());
                        questionPs.addBatch();
                    }
                    questionPs.executeBatch();
                    con.commit();
                }
                rs.close();
                ps.close();
            }
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public void updateCategory(UpdateSurveyCategoryReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        try {
            String sql = "UPDATE surveycategory set name=?, description=? where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, payload.getName());
            ps.setString(2, payload.getDescription());
            ps.setInt(3, payload.getId());
            ps.executeUpdate();
            for (DefaultQuestions question : payload.getQuestions()) {
                if (question.getId() == 0) {
                    String questionSql = "INSERT INTO defaultquestions(surveyCategoryId, question) VALUES (?, ?)";
                    System.out.println(questionSql);
                    PreparedStatement questionPs = con.prepareStatement(questionSql);
                    questionPs.setInt(1, payload.getId());
                    questionPs.setString(2, question.getQuestion());
                    questionPs.executeUpdate();
                    questionPs.close();
                }
                if (question.getId() != 0) {
                    String questionSql = "UPDATE defaultquestions set question=? where id=?";
                    System.out.println(questionSql);
                    PreparedStatement questionPs = con.prepareStatement(questionSql);
                    questionPs.setString(1, question.getQuestion());
                    questionPs.setInt(2, question.getId());
                    questionPs.executeUpdate();
                    questionPs.close();
                }
                if (payload.getDeletedQuestions().size() != 0) {
                    String delSql = "DELETE from defaultquestions where id=?";
                    System.out.println(delSql);
                    PreparedStatement deletePs = con.prepareStatement(delSql);
                    for (DefaultQuestions quest : payload.getDeletedQuestions()) {
                        deletePs.setInt(1, quest.getId());
                        deletePs.addBatch();
                    }
                    deletePs.executeBatch();
                    deletePs.close();
                }
            }
            ps.close();
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean deleteCategory(IdReq reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        try {
            boolean isdelete = false;
            String sql = "SELECT surveyCategoryId from survey where surveyCategoryId=?";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, reqData.getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return isdelete;
            } else {
                String questionSql = "DELETE from defaultquestions where surveycategoryId=?";
                System.out.println(questionSql);
                PreparedStatement questPs = con.prepareStatement(questionSql);
                questPs.setInt(1, reqData.getId());
                questPs.executeUpdate();
                String deleteSql = "DELETE from surveycategory where id=?";
                System.out.println(deleteSql);
                PreparedStatement deletePs = con.prepareStatement(deleteSql);
                deletePs.setInt(1, reqData.getId());
                int result = deletePs.executeUpdate();
                if (result != 0) {
                    isdelete = true;
                }
                return isdelete;
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public Map<Integer, Survey> geAlltSurvey(GetSurveyReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        try {
            Map<Integer, Survey> surveyMap = new LinkedHashMap<>();
            StatusDAO statusDao = new StatusDAO();
            int statusId = statusDao.getStatusId(payload.getStatus());
            if (statusId != 0) {
                String sql = "SELECT s.id, s.name, s.description, s.created_at, s.userName, s.userNameReq, s.email, s.emailReq, s.dob, s.dobReq, s.phoneNo, s.phoneNoReq, q.id, q.question, q.type, q.rate, q.isrequired, o.id, o.name from survey as s left join surveyquestion as q on s.id = q.surveyId left join  options as o on q.id = o.surveyQuestionId where s.surveyCategoryId =? and s.statusId =? and s.userId=?";
                System.out.println(sql);
                PreparedStatement ps = con.prepareStatement(sql);
                ps.setInt(1, payload.getCategoryId());
                ps.setInt(2, statusId);
                ps.setInt(3, payload.getUserId());
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    int surveyId = rs.getInt("s.id");
                    Survey survey = surveyMap.get(surveyId);
                    if (survey == null) {
                        survey = new Survey();
                        survey.setId(surveyId);
                        survey.setName(rs.getString("s.name"));
                        survey.setDescription(rs.getString("s.description"));
                        survey.setUserName(rs.getBoolean("s.userName"));
                        survey.setUserNameReq(rs.getBoolean("s.userNameReq"));
                        survey.setEmail(rs.getBoolean("s.email"));
                        survey.setEmailReq(rs.getBoolean("s.emailReq"));
                        survey.setDob(rs.getBoolean("s.dob"));
                        survey.setDobReq(rs.getBoolean("s.dobReq"));
                        survey.setPhoneNo(rs.getBoolean("s.phoneNo"));
                        survey.setPhoneNoReq(rs.getBoolean("s.phoneNoReq"));
                        survey.setStatusId(statusId);
                        survey.setCreated_at(rs.getString("s.created_at"));
                        surveyMap.put(surveyId, survey);
                    }
                    int questionId = rs.getInt("q.id");
                    SurveyQuestions question = survey.getQuestions().stream()
                            .filter(quest -> quest.getId() == questionId).findFirst().orElse(null);
                    if (question == null) {
                        question = new SurveyQuestions();
                        question.setId(questionId);
                        question.setQuestion(rs.getString("q.question"));
                        question.setType(rs.getString("q.type"));
                        question.setRate(rs.getInt("q.rate"));
                        question.setIsrequired(rs.getBoolean("q.isrequired"));
                        survey.getQuestions().add(question);
                    }
                    if ("select-multiple".equals(question.getType()) || "select-one".equals(question.getType())) {
                        int optionId = rs.getInt("o.id");
                        if (optionId != 0) {
                            Options op = new Options();
                            op.setId(optionId);
                            op.setName(rs.getString("o.name"));
                            question.getOptions().add(op);
                        }
                    }
                    if ("Published".equals(payload.getStatus())) {
                        String resSql = "SELECT id from responseusers where surveyId=?";
                        System.out.println(resSql);
                        PreparedStatement resPs = con.prepareStatement(resSql);
                        resPs.setInt(1, surveyId);
                        ResultSet resRs = resPs.executeQuery();
                        int count = 0;
                        while (resRs.next()) {
                            count = count + 1;
                        }
                        survey.setResponseCount(count);
                    }
                }

            }
            return surveyMap;
        } catch (Exception e) {
            throw e;
        }
    }

    public Survey getSurvey(IdReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        try {
            Survey survey = null;
            String sql = "SELECT s.id, s.name, s.description, s.userName, s.userNameReq, s.email, s.emailReq, s.dob, s.dobReq, s.phoneNo, s.phoneNoReq, q.id, q.question, q.type, q.rate, q.isrequired, o.id, o.name from survey as s left join surveyquestion as q on s.id = q.surveyId left join options as o on q.id = o.surveyQuestionId where s.id = ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, payload.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (survey == null) {
                    survey = new Survey();
                    survey.setId(rs.getInt("s.id"));
                    survey.setName(rs.getString("s.name"));
                    survey.setDescription(rs.getString("s.description"));
                    survey.setUserName(rs.getBoolean("s.userName"));
                    survey.setUserNameReq(rs.getBoolean("s.userNameReq"));
                    survey.setEmail(rs.getBoolean("s.email"));
                    survey.setEmailReq(rs.getBoolean("s.emailReq"));
                    survey.setDob(rs.getBoolean("s.dob"));
                    survey.setDobReq(rs.getBoolean("s.dobReq"));
                    survey.setPhoneNo(rs.getBoolean("s.phoneNo"));
                    survey.setPhoneNoReq(rs.getBoolean("s.phoneNoReq"));
                }
                int questionId = rs.getInt("q.id");
                SurveyQuestions question = survey.getQuestions().stream()
                        .filter(quest -> quest.getId() == questionId).findFirst().orElse(null);
                if (question == null) {
                    question = new SurveyQuestions();
                    question.setId(rs.getInt("q.id"));
                    question.setQuestion(rs.getString("q.question"));
                    question.setType(rs.getString("q.type"));
                    question.setRate(rs.getInt("q.rate"));
                    question.setIsrequired(rs.getBoolean("q.isrequired"));
                    survey.getQuestions().add(question);
                }
                if ("select-multiple".equals(question.getType()) || "select-one".equals(question.getType())) {
                    int optionId = rs.getInt("o.id");
                    if (optionId != 0) {
                        Options op = new Options();
                        op.setId(optionId);
                        op.setName(rs.getString("o.name"));
                        question.getOptions().add(op);
                    }
                }
            }
            return survey;
        } catch (Exception e) {
            throw e;
        }
    }

    public IdReq createSurvey(CreateSurveyRequest payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            IdReq data = null;
            StatusDAO statusDao = new StatusDAO();
            int statusId = statusDao.getStatusId(payload.getStatus());
            if (statusId != 0) {
                int row = 0;
                String sql = "INSERT INTO survey (surveyCategoryId, name, description, statusId, userName, userNameReq, email, emailReq, dob, dobReq, phoneNo, phoneNoReq, userId) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
                System.out.println(sql);
                PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, payload.getSurveyCategoryId());
                ps.setString(2, payload.getName());
                ps.setString(3, payload.getDescription());
                ps.setInt(4, statusId);
                ps.setBoolean(5, payload.isUserName());
                ps.setBoolean(6, payload.isUserNameReq());
                ps.setBoolean(7, payload.isEmail());
                ps.setBoolean(8, payload.isEmailReq());
                ps.setBoolean(9, payload.isDob());
                ps.setBoolean(10, payload.isDobReq());
                ps.setBoolean(11, payload.isPhoneNo());
                ps.setBoolean(12, payload.isPhoneNoReq());
                ps.setInt(13, payload.getUserId());
                row = ps.executeUpdate();
                if (row >= 1) {
                    ResultSet rs = ps.getGeneratedKeys();
                    if (rs.next()) {
                        int surveyId = rs.getInt(1);
                        data = new IdReq();
                        data.setId(surveyId);
                        for (SurveyQuestion q : payload.getQuestions()) {
                            int insertRow = 0;
                            String questionSql = "INSERT INTO surveyquestion(surveyId, question,type,rate,isrequired) VALUES (?,?,?,?,?)";
                            PreparedStatement questionPs = con.prepareStatement(questionSql,
                                    Statement.RETURN_GENERATED_KEYS);
                            questionPs.setInt(1, surveyId);
                            questionPs.setString(2, q.getQuestion());
                            questionPs.setString(3, q.getType());
                            questionPs.setInt(4, q.getRate());
                            questionPs.setBoolean(5, q.isIsrequired());
                            insertRow = questionPs.executeUpdate();
                            if (insertRow >= 1) {
                                System.out.println("inside insertRow");
                                System.out.println(q.getType());
                                if ("select-multiple".equals(q.getType()) || "select-one".equals(q.getType())) {
                                    System.out.println("inside getType");
                                    ResultSet questionRs = questionPs.getGeneratedKeys();
                                    if (questionRs.next()) {
                                        int questionId = questionRs.getInt(1);
                                        System.out.println(questionId);
                                        String optionSql = "INSERT INTO options(surveyquestionId,name) VALUES (?,?)";
                                        PreparedStatement optionPs = con.prepareStatement(optionSql);
                                        for (Option option : q.getOptions()) {
                                            optionPs.setInt(1, questionId);
                                            optionPs.setString(2, option.getName());
                                            optionPs.addBatch();
                                        }
                                        optionPs.executeBatch();
                                    }
                                }
                            }
                        }
                        con.commit();
                    }
                    rs.close();
                    ps.close();
                }
            }
            return data;
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public int updateSurvey(UpdateSurveyReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            StatusDAO statusDao = new StatusDAO();
            int statusId = statusDao.getStatusId(payload.getStatus());
            String sql = "UPDATE survey set name=?, description=?, statusId=?, userName=?, userNameReq=?, email=?, emailReq=?, dob=?, dobReq=?, phoneNo=?, phoneNoReq=? where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, payload.getName());
            ps.setString(2, payload.getDescription());
            ps.setInt(3, statusId);
            ps.setBoolean(4, payload.isUserName());
            ps.setBoolean(5, payload.isUserNameReq());
            ps.setBoolean(6, payload.isEmail());
            ps.setBoolean(7, payload.isEmailReq());
            ps.setBoolean(8, payload.isDob());
            ps.setBoolean(9, payload.isDobReq());
            ps.setBoolean(10, payload.isPhoneNo());
            ps.setBoolean(11, payload.isPhoneNoReq());
            ps.setInt(12, payload.getId());
            int update = ps.executeUpdate();
            for (SurveyQuestions question : payload.getQuestions()) {
                if (question.getId() == 0) {
                    String questionSql = "INSERT into surveyquestion(surveyId, question, type, rate, isrequired) values (?,?,?,?,?)";
                    PreparedStatement questionPs = con.prepareStatement(questionSql, Statement.RETURN_GENERATED_KEYS);
                    questionPs.setInt(1, payload.getId());
                    questionPs.setString(2, question.getQuestion());
                    questionPs.setString(3, question.getType());
                    questionPs.setInt(4, question.getRate());
                    questionPs.setBoolean(5, question.getIsrequired());
                    int row = questionPs.executeUpdate();
                    if (row >= 1) {
                        if ("select-multiple".equals(question.getType()) || "select-one".equals(question.getType())) {
                            ResultSet rs = questionPs.getGeneratedKeys();
                            if (rs.next()) {
                                int questionId = rs.getInt(1);
                                String optionSql = "INSERT INTO options(surveyquestionId,name) VALUES (?,?)";
                                PreparedStatement optionPs = con.prepareStatement(optionSql);
                                for (Options option : question.getOptions()) {
                                    optionPs.setInt(1, questionId);
                                    optionPs.setString(2, option.getName());
                                    optionPs.addBatch();
                                }
                                optionPs.executeBatch();
                            }
                        }
                    }

                }
                if (question.getId() != 0) {
                    String updateSql = "UPDATE surveyquestion set question=?, type=?, rate=?, isrequired=? where id=?";
                    PreparedStatement updatePs = con.prepareStatement(updateSql);
                    updatePs.setString(1, question.getQuestion());
                    updatePs.setString(2, question.getType());
                    updatePs.setInt(3, question.getRate());
                    updatePs.setBoolean(4, question.getIsrequired());
                    updatePs.setInt(5, question.getId());
                    updatePs.executeUpdate();
                    if ("select-multiple".equals(question.getType()) || "select-one".equals(question.getType())) {
                        for (Options option : question.getOptions()) {
                            if (option.getId() == 0) {
                                String optionSql = "INSERT into options(surveyquestionId, name) values (?,?)";
                                PreparedStatement optionPs = con.prepareStatement(optionSql);
                                optionPs.setInt(1, question.getId());
                                optionPs.setString(2, option.getName());
                                optionPs.executeUpdate();
                            }

                            if (option.getId() != 0) {
                                String optionSql = "UPDATE options set name=? where id=?";
                                PreparedStatement optionPs = con.prepareStatement(optionSql);
                                optionPs.setString(1, option.getName());
                                optionPs.setInt(2, option.getId());
                                optionPs.executeUpdate();
                            }
                        }
                    }
                }
            }
            if (payload.getDelQuestions().size() != 0) {
                for (IdReq id : payload.getDelQuestions()) {
                    String opSql = "SELECT id from options where surveyquestionId=?";
                    PreparedStatement opPs = con.prepareStatement(opSql);
                    opPs.setInt(1, id.getId());
                    ResultSet rs = opPs.executeQuery();
                    if (rs.next()) {
                        String delOpSql = "DELETE from options where surveyquestionId=?";
                        PreparedStatement delOpPs = con.prepareStatement(delOpSql);
                        delOpPs.setInt(1, id.getId());
                        delOpPs.executeUpdate();
                    }
                    String delQuestSql = "DELETE from surveyquestion where id=?";
                    PreparedStatement delQuestPs = con.prepareStatement(delQuestSql);
                    delQuestPs.setInt(1, id.getId());
                    delQuestPs.executeUpdate();
                }
            }
            if (payload.getDeletedOptions().size() != 0) {
                String deleteOptionSql = "DELETE from options where id=?";
                PreparedStatement deleteOpPs = con.prepareStatement(deleteOptionSql);
                for (IdReq id : payload.getDeletedOptions()) {
                    deleteOpPs.setInt(1, id.getId());
                    deleteOpPs.addBatch();
                }
                deleteOpPs.executeBatch();
            }
            return update;
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public void deleteSurvey(IdReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            String sql = "SELECT id from surveyquestion where surveyId=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, payload.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String optionSql = "SELECT id from options where surveyquestionId=?";
                PreparedStatement optionPs = con.prepareStatement(optionSql);
                optionPs.setInt(1, rs.getInt(1));
                ResultSet opRs = optionPs.executeQuery();
                if (opRs.next()) {
                    String delOpSql = "DELETE from options where surveyquestionId=?";
                    PreparedStatement delOpPs = con.prepareStatement(delOpSql);
                    delOpPs.setInt(1, rs.getInt(1));
                    delOpPs.executeUpdate();
                }
                opRs.close();
                String delQuestSql = "DELETE from surveyquestion where id=?";
                PreparedStatement delQuestPs = con.prepareStatement(delQuestSql);
                delQuestPs.setInt(1, rs.getInt(1));
                delQuestPs.executeUpdate();
            }
            String delSurveySql = "DELETE from survey where id=?";
            PreparedStatement delSurveyPs = con.prepareStatement(delSurveySql);
            delSurveyPs.setInt(1, payload.getId());
            delSurveyPs.executeUpdate();
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public void saveUserResponses(SaveUserResponseReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            String sql = "INSERT into responseusers(surveyId, name, emailId, dob, phoneNo) values(?,?,?,?,?)";
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, payload.getSurveyId());
            ps.setString(2, payload.getName());
            ps.setString(3, payload.getEmailId());
            ps.setString(4, payload.getDob());
            ps.setString(5, payload.getPhoneNo());
            int row = ps.executeUpdate();
            if (row >= 1) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    int userId = rs.getInt(1);
                    String questionSql = "INSERT into responsedquestions(responseusersId, questionId, answer) values(?,?,?)";
                    PreparedStatement questionPs = con.prepareStatement(questionSql);
                    for (ResponsedQuestions question : payload.getQuestions()) {
                        questionPs.setInt(1, userId);
                        questionPs.setInt(2, question.getQuestionId());
                        questionPs.setString(3, question.getAnswer());
                        questionPs.addBatch();
                    }
                    questionPs.executeBatch();
                }
            }
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public Map<Integer, ResponseUsersRes> getAllUserResponse(IdReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            Map<Integer, ResponseUsersRes> userResMap = new LinkedHashMap<>();
            String sql = "select u.id, u.name, u.emailId, u.dob, u.phoneNo, \n" + //
                    "r.questionId, r.answer,\n" + //
                    "q.question, q.rate, q.type,\n" + //
                    "o.id, o.name\n" + //
                    "from responseusers as u \n" + //
                    "left join responsedquestions as r on u.id = r.responseusersId \n" + //
                    "inner join surveyquestion as q on r.questionId = q.id\n" + //
                    "left join options as o on q.id = o.surveyquestionId where u.surveyId=?";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, payload.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int userId = rs.getInt("u.id");
                ResponseUsersRes response = userResMap.get(userId);
                if (response == null) {
                    response = new ResponseUsersRes();
                    response.setId(userId);
                    response.setName(rs.getString("u.name"));
                    response.setEmailId(rs.getString("u.emailId"));
                    response.setDob(rs.getString("u.dob"));
                    response.setPhoneNo(rs.getString("u.phoneNo"));
                    userResMap.put(userId, response);
                }
                int questionId = rs.getInt("r.questionId");
                ResponsedQuestionsRes question = response.getQuestions().stream()
                        .filter(quest -> quest.getQuestionId() == questionId).findFirst().orElse(null);
                if (question == null) {
                    question = new ResponsedQuestionsRes();
                    question.setQuestionId(questionId);
                    question.setQuestion(rs.getString("q.question"));
                    question.setType(rs.getString("q.type"));
                    question.setRate(rs.getInt("q.rate"));
                    question.setAnswer(rs.getString("r.answer"));
                    response.getQuestions().add(question);
                }
                if ("select-multiple".equals(question.getType()) || "select-one".equals(question.getType())) {
                    int optionId = rs.getInt("o.id");
                    if (optionId != 0) {
                        Options op = new Options();
                        op.setId(optionId);
                        op.setName(rs.getString("o.name"));
                        question.getOptions().add(op);
                    }
                }
            }
            return userResMap;

        } catch (Exception e) {
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public void changeStatus(ChangeStatusReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            StatusDAO statusDao = new StatusDAO();
            int statusId = statusDao.getStatusId(payload.getStatus());
            String sql = "UPDATE survey set statusId=? where id=?";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, statusId);
            ps.setInt(2, payload.getId());
            ps.executeUpdate();
        } catch (Exception e) {
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public EmailExistsRes checkEmail(String email) throws Exception {
        Connection con = DBConnection.getConnection();
        try {
            EmailExistsRes emailRes = new EmailExistsRes();
            String sql = "SELECT email from users where email = ?";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                emailRes.setExists(true);
            } else {
                emailRes.setExists(false);
            }
            return emailRes;
        } catch (Exception e) {
            throw e;
        }
    }

    public void changePassword(ChangePasswordReq payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            String emailExistsSql = "SELECT email from users where email=?";
            PreparedStatement emailExistsPs = con.prepareStatement(emailExistsSql);
            emailExistsPs.setString(1, payload.getEmail());
            ResultSet existsRs = emailExistsPs.executeQuery();
            if (existsRs.next()) {
                String sql = "UPDATE users set password=? where email=?";
                System.out.println(sql);
                PreparedStatement ps = con.prepareStatement(sql);
                ps.setString(1, payload.getPassword());
                ps.setString(2, payload.getEmail());
                ps.executeUpdate();
            } else {
                throw new Exception("Email isn't exists");
            }
        } catch (Exception e) {
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }
}
