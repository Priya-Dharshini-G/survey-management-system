package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.SurveyCategoryDAO;
import requestmodel.UpdateSurveyReq;
import responsehandler.ResponseHandler;

public class UpdateSurveyServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost UpdateSurveyServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            UpdateSurveyReq payload = gson.fromJson(reader, UpdateSurveyReq.class);
            SurveyCategoryDAO surveyDAO = new SurveyCategoryDAO();
            int isUpdate = surveyDAO.updateSurvey(payload);
            if (isUpdate != 0) {
                String retRes = resHandler.SuccessRes(res, "Survey updated successfully");
                res.setStatus(HttpServletResponse.SC_OK);
                res.getWriter().print(retRes);
            }

        } catch (Exception e) {
            e.printStackTrace();
            String retRes = resHandler.ErrRes(res, e.getMessage());
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            res.getWriter().print(retRes);
        }
    }
}
