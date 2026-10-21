package controller;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import dao.SurveyCategoryDAO;
import responsehandler.ResponseHandler;
import responsemodel.EmailExistsRes;

public class CheckEmailServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost CheckEmailServlet");
            String email = req.getReader().readLine();
            SurveyCategoryDAO surveyDAO = new SurveyCategoryDAO();
            EmailExistsRes emailExists = surveyDAO.checkEmail(email);
            Gson gson = new Gson();
            JsonElement data = gson.toJsonTree(emailExists);
            String retRes = resHandler.SuccessRes(res, "Email checked successfully", data);
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
