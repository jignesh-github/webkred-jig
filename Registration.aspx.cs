using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Web.Services;
using System.Data;

namespace WebKred
{
    public partial class Registration : System.Web.UI.Page
    {
        #region Variables

        CompanyBAL companyBAL = new CompanyBAL();
        UserBAL userBAL = new UserBAL();
        DataTable dt = new DataTable();
        int companyId;
        int paymentPlanId;

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["planId"] != null && Request.QueryString["planId"].ToString() != "")
            {
                paymentPlanId = Convert.ToInt32(Request.QueryString["planId"]);
            }
        }

        protected void btnCreateMyAccount_Click(object sender, EventArgs e)
        {
            if (Page.IsValid)
            {
                companyBAL.CompanyName = txtCompany.Text.Trim();
                companyBAL.Subdomain = txtSubdomain.Text.Trim();
                companyBAL.CardNumber = txtCardNumber.Text.Trim();
                companyBAL.ExpiresOn = ddlMonth.SelectedValue + "-" + ddlYear.SelectedValue;
                companyBAL.BillingZip = txtBillingZip.Text.Trim();
                companyBAL.Coupon = txtCoupon.Text.Trim();
                companyBAL.PaymentPlanId = paymentPlanId;

                try
                {
                    companyId = companyBAL.CompanyInsert();
                }
                catch (SqlException ex)
                {
                    Response.Write(ex.Message);
                }

                userBAL.FirstName = txtFirstName.Text.Trim();
                userBAL.LastName = txtLastName.Text.Trim();
                userBAL.Email = txtEmail.Text.Trim();
                userBAL.UserName = txtUserName.Text.Trim();
                userBAL.UserPassword = txtPassword2.Text.Trim();
                userBAL.Title = "";
                userBAL.OfficeNo = "";
                userBAL.MobileNo = "";
                userBAL.UserRoleId = 1;
                userBAL.CompanyId = companyId;

                try
                {
                    userBAL.UserId = userBAL.UserInsert();

                    dt = userBAL.UserSelect();

                    if (dt.Rows.Count > 0)
                    {
                        Session["UserName"] = dt.Rows[0]["UserName"].ToString();
                        Session["UserId"] = dt.Rows[0]["UserId"].ToString();
                        Session["CompanyId"] = dt.Rows[0]["CompanyId"].ToString();
                        Session["ProjectId"] = 1;
                        Session["ProjectName"] = "Project 1";
                        Session["RoleName"] = dt.Rows[0]["RoleName"].ToString();

                        Response.Redirect("~/FirstVisit.aspx");
                    }                    
                }
                catch (SqlException ex)
                {
                    Response.Write(ex.Message);
                }
                //RestartPage();
            }
        }

        #endregion

        #region Methods

        private void RestartPage()
        {
            Response.Redirect(Request.Url.PathAndQuery);
        }

        [WebMethod]
        public static bool CheckUser(string userName)
        {
            bool isUserNameExist;
            UserBAL userBAL = new UserBAL();
            userBAL.UserName = userName;
            isUserNameExist = userBAL.CheckUserNameExists();

            return isUserNameExist;
        }

        #endregion
    }
}