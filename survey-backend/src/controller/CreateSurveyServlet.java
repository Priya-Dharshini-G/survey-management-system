package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import dao.SurveyCategoryDAO;
import requestmodel.CreateSurveyRequest;
import requestmodel.IdReq;
import responsehandler.ResponseHandler;

public class CreateSurveyServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("Inside doPost CreateSurveyServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            CreateSurveyRequest payload = gson.fromJson(reader, CreateSurveyRequest.class);
            SurveyCategoryDAO survey = new SurveyCategoryDAO();
            IdReq surveyId = survey.createSurvey(payload);
            JsonElement data = gson.toJsonTree(surveyId);
            String retRes = resHandler.SuccessRes(res, "Survey created successfully", data);
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
