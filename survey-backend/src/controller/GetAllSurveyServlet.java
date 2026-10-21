package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import dao.SurveyCategoryDAO;
import model.Survey;
import requestmodel.GetSurveyReq;
import responsehandler.ResponseHandler;

public class GetAllSurveyServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost GetAllSurveyServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            GetSurveyReq payload = gson.fromJson(reader, GetSurveyReq.class);
            SurveyCategoryDAO surveyDAO = new SurveyCategoryDAO();
            Map<Integer, Survey> survey = surveyDAO.geAlltSurvey(payload);
            System.out.println(survey.values());
            JsonElement data = gson.toJsonTree(survey.values());
            String retRes = resHandler.SuccessRes(res, "Survey retrieved successfully", data);
            res.setStatus(HttpServletResponse.SC_OK);
            res.getWriter().print(retRes);
        } catch (Exception e) {
            e.printStackTrace();
            String retRes = resHandler.ErrRes(res, e.getMessage());
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            res.getWriter().print(retRes);
        }
    }
}
