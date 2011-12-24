using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Net.Mail;
using System.Web.Services;

namespace WebKred
{
    public partial class Login : System.Web.UI.Page
    {
        #region Variables

        UserBAL userBAL = new UserBAL();
        DataTable dataTable = new DataTable();

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                txtUserName.Focus();

                if (Request.Cookies["UserName"] != null && Request.Cookies["UserName"].Value != "")
                {
                    txtUserName.Text = Request.Cookies["UserName"].Value;
                    txtPassword.Attributes.Add("value", Request.Cookies["Password"].Value);
                    chkRememberMe.Checked = true;
                }
            }
            if (chkRememberMe.Checked)
            {
                if (txtUserName.Text != "")
                {
                    Response.Cookies["UserName"].Value = txtUserName.Text;
                    Response.Cookies["Password"].Value = txtPassword.Text;
                }
            }
            else
            {
                Response.Cookies["UserName"].Expires = DateTime.Now.AddMonths(-1);
                Response.Cookies["Password"].Expires = DateTime.Now.AddMonths(-1);
            }

            lblErrorMsg.Text = "";

        }

        protected void btnSignIn_Click(object sender, EventArgs e)
        {
            try
            {
                if (!Page.IsValid)
                {
                    return;
                }

                userBAL.UserName = txtUserName.Text;
                userBAL.UserPassword = txtPassword.Text;

                dataTable = userBAL.UserCheck();

                if (dataTable.Rows.Count > 0)
                {
                    Session["UserName"] = dataTable.Rows[0]["UserName"].ToString();
                    Session["UserId"] = dataTable.Rows[0]["UserId"].ToString();
                    Session["CompanyId"] = dataTable.Rows[0]["CompanyId"].ToString();
                    Session["ProjectId"] = 1;
                    Session["ProjectName"] = "Project 1";
                    Session["RoleName"] = dataTable.Rows[0]["RoleName"].ToString();

                    Response.Redirect("~/FirstVisit.aspx");
                }
                else
                {
                    lblErrorMsg.Text = "Sorry Login Faild Please Try Again !";
                }
            }
            catch (Exception ex)
            {
                string s = ex.Message;
                lblErrorMsg.Text = "Sorry Login Faild Please Try Again !";
            }
        }

        #endregion
    }
}