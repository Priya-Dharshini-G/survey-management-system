package controller;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.UserDAO;
import model.User;
import responsehandler.ResponseHandler;

public class CreateUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            User reqData = gson.fromJson(reader, User.class);
            UserDAO userDao = new UserDAO();
            int row = userDao.create(reqData);
            if (row == 1) {
                String retRes = resHandler.SuccessRes(res, "User Created Successfully");
                res.setStatus(HttpServletResponse.SC_OK);
                res.getWriter().print(retRes);
            } else {
                System.out.println(row);
            }
        } catch (Exception e) {
            e.printStackTrace();
            String retRes = resHandler.ErrRes(res, e.getMessage());
            res.getWriter().print(retRes);
        }
    }
}
