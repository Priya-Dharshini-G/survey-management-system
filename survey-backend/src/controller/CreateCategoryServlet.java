package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.SurveyCategoryDAO;
import requestmodel.CreateCategoryRequest;
import responsehandler.ResponseHandler;

public class CreateCategoryServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost CreateSurveyCategoryServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            CreateCategoryRequest payload = gson.fromJson(reader, CreateCategoryRequest.class);
            SurveyCategoryDAO category = new SurveyCategoryDAO();
            category.createCategory(payload);
            String retRes = resHandler.SuccessRes(res, "Category Created Successfully");
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
