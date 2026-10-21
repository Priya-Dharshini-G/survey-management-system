package controller;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import dao.UserDAO;
import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.User;
import responsehandler.ResponseHandler;

public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("Inside LoginServlet doPost()");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            User reqUser = gson.fromJson(reader, User.class);
            UserDAO userDao = new UserDAO();
            User loginUser = userDao.getLoginUser(reqUser.getEmail(), reqUser.getPassword());
            JsonElement data = gson.toJsonTree(loginUser);
            if (loginUser == null) {
                String retRes = resHandler.ErrRes(res, "Invalid email or password");
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                res.getWriter().print(retRes);
            } else {
                String retRes = resHandler.SuccessRes(res, "Login Successfully", data);
                res.setStatus(HttpServletResponse.SC_OK);
                res.getWriter().print(retRes);
            }
        } catch (Exception e) {
            e.printStackTrace();
            String retRes = resHandler.ErrRes(res, e.getMessage());
            res.getWriter().print(retRes);
        }
    }
}
